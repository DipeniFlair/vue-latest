<template>
    <loader v-if="loading == true" />
    <section id="pdfPreview" class=" h-screen">
        <div class="container">
            <div class="flex flex-row">
                <div class="w-full max-w-md text-white px-5 py-10 bg-gray-800 border-2 border-primary-500">
                    <div class="fileSelectorBox flex flex-col">
                        <label for="selectFile">Select PDF:</label>
                        <!-- <input type="file" id="uploadedFiles" @change="loadPDF" class="px-4 bg-blue-500 text-white rounded-lg"
                                accept="application/pdf" /> -->
                        <input type="file" name="uploadedFiles" id="uploadedFiles" @change="loadPDF"
                            class="rounded-lg border-2 outline-none focus:ring-0 border-primary-500 focus:border-primary-700 bg-transparent text-white px-3.5 leading-4 file:bg-primary-500 file:focus:bg-primary-700 transition-all"
                            accept="application/pdf" />
                    </div>
                    <div class="flex justify-center items-center mt-4">
                        <button @click="goToPage(-1)" id="prevBtn" :disabled="!pdf || currentPage === 1"
                            class="text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 border-primary-500 bg-primary-600 hover:bg-primary-700 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed">
                            Previous
                        </button>
                        <span class="mx-2 text-lg">Page</span>
                        <input type="number" id="current_page" v-model.number="currentPage" @keypress.enter="randomPage()"
                            class="w-20 rounded-lg outline-none focus:ring-0 border-primary-500 focus:border-primary-700 bg-transparent text-white text-center px-3.5 leading-4" />
                        <span class="mx-2 text-lg">of</span>
                        <input type="number" id="totalNumber" :value="totalPages" disabled
                            class="w-20 rounded-lg outline-none focus:ring-0 border-primary-500 focus:border-primary-700 bg-transparent text-white text-center px-3.5 leading-4" />
                        <button @click="goToPage(+1)" id="nextBtn" :disabled="!pdf || currentPage === totalPages"
                            class="text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 border-primary-500 bg-primary-600 hover:bg-primary-700 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed">
                            Next
                        </button>
                    </div>
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


export default {
    name: 'PdfViewer',
    data() {
        return {
            pdf: null,
            currentPage: 1,
            totalPages: 0,
            zoom: 1,
            loading: false,
            randomPageNumber: 0,
        }
    },
    components: {
        // pdfjsLib,
        loader,
    },
    mounted() {
    },
    methods: {
        async render() {
            if (!this.pdf) {
                return;
            }

            toRaw(this.pdf).getPage(this.currentPage).then((page) => {
                const canvas = document.getElementById('pdf_renderer');
                const ctx = canvas.getContext('2d');

                const viewport = page.getViewport({ scale: this.zoom });
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport,
                };
                const renderTask = page.render(renderContext);

                renderTask.promise.then(() => {
                    document.getElementById('totalNumber').value = this.pdf.numPages;
                });
                this.loading = false;
                if (this.pdf.numPages == this.currentPage) {
                    document.getElementById("nextBtn").setAttribute("disabled", "disabled")
                } else {
                    document.getElementById("nextBtn").removeAttribute("disabled")
                }
            });
        },


        loadPDF(e) {
            this.loading = true;
            const selectedFile = e.target.files[0];
            const objectURL = window.URL.createObjectURL(selectedFile);
            console.log("selectedFile", selectedFile, "objectURL", objectURL);

            pdfjsLib.getDocument(objectURL).promise.then((pdf) => {
                this.pdf = pdf;
                this.render();
            });
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
        }
    },
}
</script>
  