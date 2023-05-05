<template>
    <loader v-if="loading == true" />
    <section id="pdfPreview" class="py-5">
        <div class="container">
            <div class="flex flex-row flex-wrap lg:flex-nowrap">
                <div class="w-full max-w-md text-white px-5 py-7 bg-gray-800 border-2 border-primary-500">
                    <div class="fileSelectorBox flex flex-col">
                        <label for="selectFile">Select PDF:</label>
                        <!-- <input type="file" id="uploadedFiles" @change="loadPDF" class="px-4 bg-blue-500 text-white rounded-lg"
                                accept="application/pdf" /> -->
                        <input type="file" name="uploadedFiles" id="uploadedFiles" @change="loadPDF"
                            class="rounded-lg border-2 outline-none focus:ring-0 border-primary-500 focus:border-primary-700 bg-transparent text-white px-3.5 leading-4 file:bg-primary-500 file:focus:bg-primary-700 transition-all"
                            accept="application/pdf" />
                    </div>
                    <div class="flex justify-center items-center mt-10 text-center gap-5">
                        <span class="text-lg">Page</span>
                        <input type="number" id="current_page" v-model.number="currentPage" disabled min="1" :max="totalPages" @keypress.enter="randomPage()"
                            class="w-20 rounded-lg outline-none focus:ring-0 border-primary-500 focus:border-primary-700 bg-transparent text-white px-3.5 leading-4" />
                        <span class="text-lg">of</span>
                        <input type="number" id="totalNumber" :value="totalPages" disabled
                            class="w-20 rounded-lg outline-none focus:ring-0 border-primary-500 focus:border-primary-700 bg-transparent text-white px-3.5 leading-4" />
                    </div>
                    <div class="flex justify-center items-center mt-10 text-center gap-5">
                        <button @click="goToPage(-1)" id="prevBtn" :disabled="!pdf || currentPage == 1"
                            class="text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 border-primary-500 bg-primary-600 hover:bg-primary-700 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed">
                            Previous
                        </button>
                        <button @click="goToPage(+1)" id="nextBtn" :disabled="!pdf || currentPage == totalPages"
                            class="text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 border-primary-500 bg-primary-600 hover:bg-primary-700 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed">
                            Next
                        </button>
                    </div>
                    <div class="downloadBox text-center mt-10">
                        <a v-if="downloadImage != null" :href="downloadImage" class="text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 border-primary-500 bg-primary-600 hover:bg-primary-700 focus:outline-none" id="downloadImage" download="image.png">Download Image</a>
                    </div>
                </div>
                <div id="pdfPreviewCover" class="w-full max-w-5xl overflow-hidden overflow-y-auto px-5 flex justify-center">
                    <a :href="downloadImage" data-fancybox="PDFPreview">
                        <canvas id="pdf_renderer" class="mx-auto max-w-full h-full"></canvas>
                    </a>
                </div>
                <div id="generateThumbPreview">
                </div>
            </div>
        </div>
    </section>
</template>
  
<script>
import * as pdfjsLib from 'pdfjs-dist';
import loader from "../../components/helpers/loader.vue";
import { toRaw } from 'vue';
pdfjsLib.GlobalWorkerOptions.workerSrc = '../../node_modules/pdfjs-dist/build/pdf.worker.js';
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';
import '@fancyapps/ui/dist/fancybox/fancybox.css';


export default {
    name: 'PdfViewer',
    data() {
        return {
            pdf: null,
            currentPage: 0,
            totalPages: 0,
            zoom: 1,
            loading: false,
            randomPageNumber: 0,
            downloadImage: null,
        }
    },
    components: {
        loader,
    },
    mounted() {

        function pageHeight() {
            let bodyHeight = window.innerHeight;
            let mainHeader = document.getElementById("mainHeader").offsetHeight;
            let pdfPreviewCover = document.getElementById("pdfPreviewCover");
            // console.log("mainHeader", mainHeader, bodyHeight, pdfPreviewCover);
            pdfPreviewCover.style.height = bodyHeight - mainHeader - '40' + 'px';
        }
        pageHeight();
        window.addEventListener('resize', function() {
            pageHeight();
        }, true);
    },
    methods: {
        async render() {
            if (!this.pdf) {
                return;
            }
            Fancybox.unbind('[data-fancybox]');

            toRaw(this.pdf).getPage(this.currentPage).then((page) => {
                const canvas = document.getElementById('pdf_renderer');
                const ctx = canvas.getContext('2d', {willReadFrequently: true});

                const viewport = page.getViewport({ scale: this.zoom * 3 });
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport,
                };
                const renderTask = page.render(renderContext);

                renderTask.promise.then(() => {
                    this.totalPages = this.pdf.numPages;
                    this.loading = false;
                    if (this.pdf.numPages == this.currentPage) {
                        document.getElementById("nextBtn").setAttribute("disabled", "disabled")
                    } else {
                        document.getElementById("nextBtn").removeAttribute("disabled")
                    }
                    // setTimeout(() => {
                        // var pdf_renderer = document.getElementById("pdf_renderer");
                        canvas.toBlob((blob) => {
                            const url = URL.createObjectURL(blob);
                            this.downloadImage = url;
                        })
                        Fancybox.bind('[data-fancybox]', {
                            Toolbar: {
                                display: {
                                    left: ["infobar"],
                                    middle: [],
                                    right: [
                                        "zoom",
                                        "fullscreen", 
                                        "close",
                                    ],
                                },
                            },
                        });
                        Fancybox.defaults.Hash = false;
                    // }, 1000);
                });
            });
        },


        loadPDF(e) {
            if (e.target.files[0] == null) {
                return;
            }
            this.loading = true;
            const selectedFile = e.target.files[0];
            const objectURL = window.URL.createObjectURL(selectedFile);
            console.log("selectedFile", selectedFile, "objectURL", objectURL);

            pdfjsLib.getDocument(objectURL).promise.then((pdf) => {
                this.pdf = pdf;
                this.render();
                this.generateThumb(this.pdf);
            });
            this.currentPage = 1;
        },

        generateThumb(i) {
            let generateThumbPreview =  document.getElementById("generateThumbPreview");
            console.log(i, "generateThumbPreview", generateThumbPreview);
            // i.numPages
            // i.numPages.forEach(element => {
            //     console.log("element", element);
            // });
        },

        goToPage(pageCount) {
            console.log("pageCount", pageCount, "Total Pages", this.pdf.numPages);
            this.loading = true;
            if (pageCount == 1) {
                this.currentPage += 1;
                this.render();
            } else if (pageCount == -1) {
                this.currentPage -= 1;
                this.render();
            } else {
                this.loading = false;
            }
        },

        randomPage() {
            // console.log("Picked page number", this.currentPage, "this.randomPageNumber", this.randomPageNumber);
            this.loading = true;
            if (this.pdf.numPages <= this.currentPage) {
                this.currentPage = this.pdf.numPages;
                this.render();
            } else {
                this.render();
            }
            this.loading = false;
        },

        // downloadImage() {
        //     var image = document.getElementById("pdf_renderer").toDataURL("image/png")
        //         .replace("image/png", "image/octet-stream");
        //     download.setAttribute("href", image);
        //     //download.setAttribute("download","archive.png");
        // }
    },
}
</script>
  