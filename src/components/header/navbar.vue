<template>

    <header id="mainHeader">
        <nav class="border-gray-200 px-4 lg:px-6 py-2.5 bg-gray-800">
            <div class="container flex flex-wrap justify-between items-center px-1.5">
                <router-link to="/" class="flex items-center text-primary-300">
                    <span class="self-center text-xl font-semibold whitespace-nowrap">Vue-Latest</span>
                </router-link>
                <div class="flex items-center lg:order-2">
                    <router-link to="/auth/Login" class="text-white focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-gray-700 focus:outline-none">Login</router-link>
                    <a href="#" class="text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 bg-primary-600 hover:bg-primary-700 focus:outline-none">Get started</a>
                    <button data-collapse-toggle="main-mobile-menu" type="button" class="inline-flex items-center p-2 ml-1 text-sm rounded-lg lg:hidden focus:outline-none text-gray-400 hover:bg-gray-700" aria-controls="mobile-menu-2" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="main-mobile-menu">
                    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <router-link to="/HelloWorld" class="navLink">HelloWorld</router-link>
                        </li>
                        <li>
                            <router-link to="/RickAndMorty" class="navLink">Rick and Morty</router-link>
                        </li>
                        <li>
                            <router-link to="/WallPaper" class="navLink">WallPaper</router-link>
                        </li>
                        <li>
                            <router-link to="/TodoItems" class="navLink">Todo List</router-link>
                        </li>
                        <li>
                            <router-link to="/PDFpreview" class="navLink">PDFpreview</router-link>
                        </li>
                        <!-- <li>
                            <router-link to="/PDFpreviewOriginal" class="navLink">PDFpreviewOriginal</router-link>
                        </li> -->
                    </ul>
                </div>
            </div>
        </nav>
    </header>

</template>

<script>
    export default {
        name: 'navbar',
        data() {
            return {

            };
        },
        mounted(){
                
        },
        methods:{
            
        }
    }
</script>