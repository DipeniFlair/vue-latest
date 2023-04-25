<template>
    <loader v-if="loading == true" />
    <div class="bg-gray-100 h-screen flex flex-col items-center justify-center">
        <div class="w-full max-w-md mx-auto">
            <canvas id="pdf_renderer" class="w-full"></canvas>
        </div>
        <div class="flex justify-center items-center mt-4">
            <button @click="goToPage(-1)" id="prevBtn" :disabled="!pdf || currentPage === 1"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed">
                Previous
            </button>
            <span class="mx-2 text-lg text-white">Page</span>
            <input type="number" id="current_page" v-model.number="currentPage" @keypress.enter="randomPage()"
                class="w-20 px-2 py-1 rounded-md text-center border-2 border-blue-500" />
            <span class="mx-2 text-lg text-white">of</span>
            <input type="number" id="totalNumber" :value="totalPages" disabled
                class="w-20 px-2 py-1 rounded-md text-center border-2 border-gray-400 bg-gray-50" />
            <button @click="goToPage(+1)" id="nextBtn" :disabled="!pdf || currentPage === totalPages"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2 disabled:bg-gray-400 disabled:cursor-not-allowed">
                Next
            </button>
        </div>
        <div class="mt-4">
            <input type="file" id="uploadedFiles" @change="loadPDF" class="px-4 bg-blue-500 text-white rounded-lg"
                accept="application/pdf" />
        </div>
    </div>
</template>
  
<script>
import * as pdfjsLib from 'pdfjs-dist';
import loader from "../../components/helpers/loader.vue";
import { toRaw } from 'vue';
pdfjsLib.GlobalWorkerOptions.workerSrc = '../../node_modules/pdfjs-dist/build/pdf.worker.js';


export default {
    name: 'PDFpreviewOriginal',
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
            if (this.pdf.numPages <= this.currentPage){
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
  