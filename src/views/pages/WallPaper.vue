<template>
    <section class="homeSection py-20">
        <loader v-if="loading == true" />
        <toast v-bind:notFoundError="notFoundError" v-if="notFoundError != null" />
        <div class="container">
            <h1 class="text-white text-2xl text-center mb-5">Wall-Paper :: <small class="text-white">Total Result : <b>{{ totalResults }}</b></small></h1>
            <div class="flex items-stretch justify-center mb-10">
                <div class="control">
                    <input
                    v-model="search"
                    type="text"
                    class="rounded-lg outline-none focus:ring-0 border-primary-500 focus:border-primary-700 bg-transparent text-white border-r-0 rounded-r-none px-3.5 leading-4"
                    placeholder="Search"
                    v-on:keyup.enter="searchData"
                    >
                </div>
                <div class="control">
                    <button class="text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 rounded-l-none border-primary-500 bg-primary-600 hover:bg-primary-700 focus:outline-none" v-on:click="searchData">Search</button>
                </div>
            </div>
            <div class="row grid grid-cols-5 gap-5">
                <div class="col-sm-6 col-md-6 col-lg-6 grid-item" v-for="post in posts" :key="post.id">
                    <div class="card h-100 group relative">
                        <a data-fancybox="wallpaper" :href="post.src.large" class="">
                            <img :src="post.src.medium" :alt="post.alt" class="card-img-top w-full aspect-square object-cover" alt="" />
                        </a>

                        <div class="card-body d-flex flex-column justify-content-end align-items-center text-center absolute bottom-10 opacity-0 group-hover:opacity-100 group-hover:bottom-5 left-1/2 -translate-x-1/2 transition-all w-full">
                            <h5 v-if="1 == 0" class="card-title font-size-14">
                                <small class="font-size-12">Photographer :</small>
                                {{ post.photographer }}
                            </h5>
                            <a :href="post.src.original" @click.prevent="downloadItem(post.src.original, post.alt)" :data-download-src="post.src.original" class="btn">Download Full Image</a>
                        </div>
                    </div>
                </div>
            </div>
            <nav class="pagination" role="navigation" aria-label="pagination">
                <ul class="paginationList">
                    <li><a href="javascript:void(0)" class="paginationLink" :class="{disabledLink: page == 1}" @click="changePage( page - 1)">Prev</a></li>
                    <li>
                        <a class="pagination-link is-current">{{page}}</a>
                    </li>
                    <li><a href="javascript:void(0)" class="paginationLink" @click="changePage( page + 1)">Next</a></li>
                </ul>
            </nav>
        </div>
    </section>
</template>
  
<script lang="js">
    import axios from 'axios';
    import toast from "../../components/helpers/toast.vue";
    import loader from "../../components/helpers/loader.vue";
    import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';
    import '@fancyapps/ui/dist/fancybox/fancybox.css';

    export default {
        name: 'WallPaper',
        data() {
            return {
                search: 'all',
                posts: [],
                page: 1,
                perPage: 20,
                totalResults: null,
                loading: false,
                notFoundError: "",
            };
        },
        components: {
            toast,
            loader,
        },
        created() {
            this.fetch();
            document.title = "Wallpaper for you!!";
            this.notFoundError = null;

            Fancybox.bind('[data-fancybox]', {
                Toolbar: {
                    items: {
                        // downloadItem: {
                        //     tpl: '<button class="f-button"><svg><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></button>', click: () => {
                        //         // window.open();
                        //         this.downloadItem();
                        //     },
                        // },
                    },
                    display: {
                        left: ["infobar"],
                        middle: [],
                        right: [
                            "zoom",
                            "fullscreen", 
                            // "downloadItem", 
                            "close",
                        ],
                    },
                },
            });
            Fancybox.defaults.Hash = false;
        },
        methods: {
            async fetch() {
                
                const errorThis = this;
                const headers = {
                    Authorization: '6gEzdKdFPtDqBHqE4Uusq56hi5mvVJGxpxxKZR41g9ONhCKwCvgrd2TM',
                };

                if (this.search == "") {
                    this.search = "collection";
                }

                let url = `https://api.pexels.com/v1/search?page=${this.page}&per_page=${this.perPage}&query=${this.search}&locale="tr-TR"`;
                // let response = 
                await axios
                .get(url, { headers }, (this.loading = true))
                .then(res=> {
                    errorThis.notFoundError = null;
                    this.posts = res.data.photos;
                    this.loading = false;
                    this.totalResults = res.data.total_results;
                    
                    if (res.data.photos.length <= 0){
                        errorThis.notFoundError = "No Image Found";
                    } else {
                        errorThis.notFoundError = null;
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        errorThis.notFoundError = error.response.data.error;
                    }
                });
                // console.log(response);
            },
            searchData() {
                this.page = 1;
                this.fetch();
            },
            changePage(page) {
                this.page = page <= 0 || page > this.pages ? this.page : page;
                this.fetch();
                window.scrollTo({top: 0, behavior: 'smooth'});
            },

            downloadItem (url, imageName) {
                axios.get(url, { responseType: 'blob' })
                .then(response => {
                    const blob = new Blob([response.data], { type: 'application/jpeg' })
                    const link = document.createElement('a'); //Created dummy 'a' tag
                    link.href = URL.createObjectURL(blob); //created dummy url on click
                    link.setAttribute("download",imageName+".png"); //to change image name
                    link.click();
                    URL.revokeObjectURL(link.href);
                }).catch(console.error)
            }
            
            // next() {
            //     this.page++;
            //     this.fetch();
            // },
            // prev() {
            //     this.page--;
            //     this.fetch();
            // },
        },
    };
</script>