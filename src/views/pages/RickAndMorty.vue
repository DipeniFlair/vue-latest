<template>
    <section class="homeSection py-20">
        <loader v-if="loading == true" />
        <toast v-bind:notFoundError="notFoundError" v-if="notFoundError != null" />
        <div class="container">
            <h1 class="text-white text-2xl text-center mb-5">Rick & Morty</h1>
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
            <div class="characterCover grid grid-cols-4 gap-5">
                <RickAndMortyCharacter 
                v-for="character of characters"
                :key="character.id"
                v-bind:character="character"
                />
            </div>
            <nav class="pagination" role="navigation" aria-label="pagination">
                <ul class="paginationList">
                    <li><a href="javascript:void(0)" class="paginationLink" :class="{
                    disabledLink: page == 1
                }" @click="changePage( page - 1)">Prev</a></li>
                    <li>
                        <a class="pagination-link is-current">{{page}}</a>
                    </li>
                    <li><a href="javascript:void(0)" class="paginationLink" :class="{
                        disabledLink: page == pages
                    }" @click="changePage( page + 1)">Next</a></li>
                </ul>
            </nav>
        </div>
    </section>
</template>
  
<script>
    import axios from "axios";
    import toast from "../../components/helpers/toast.vue";
    import loader from "../../components/helpers/loader.vue";
    import RickAndMortyCharacter from "../../components/helpers/RickAndMortyCharacter.vue";

    export default {
        name: "RickAndMorty",
        data() {
            return {
                characters: [],
                page: 1,
                pages: 1,
                search: "",
                modal: false,
                currentCharacter: {},
                loading: false,
                notFoundError: "",
            };
        },
        components: {
            toast,
            loader,
            RickAndMortyCharacter,
        },
        created() {
            this.fetch();
            document.title = "Rick and Morty API";
            this.notFoundError = null;
        },
        methods: {
            async fetch() {
                const params = {
                    page: this.page,
                    name: this.search
                };

                const errorThis = this;

                let url = "https://rickandmortyapi.com/api/character";
                let result = await axios
                .get(url, { params }, (this.loading = true))
                .then(res => {
                    this.characters = res.data.results;
                    this.loading = false;
                    this.pages = res.data.info.pages;

                    errorThis.notFoundError = null;
                })
                .catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        errorThis.notFoundError = error.response.data.error;
                    }
                });
                console.log(result);
            },
            changePage(page) {
                this.page = page <= 0 || page > this.pages ? this.page : page;
                this.fetch();
                window.scrollTo({top: 0, behavior: 'smooth'});
            },
            searchData() {
                this.page = 1;
                this.fetch();
            },
        }
    }
</script>