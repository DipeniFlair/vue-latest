<template>
    <div class="mainSingleCard text-center bg-green-800 shadow shadow-primary-700 hover:shadow-primary-900 hover:bg-green-600 p-5 rounded-md transition-all relative group overflow-hidden">
        <a href="javascript:void(0)" :id="character.id">
            <img :src="character.image" :alt="character.name" class="rounded aspect-square w-full">
            <h3 class="text-white text-lg absolute left-2/4 -translate-x-2/4 top-2/4 bg-primary-500 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:-translate-y-2/4 transition-all duration-1000">{{ character.name }}</h3>
        </a>
    </div>
</template>
  
<script>
    export default {
        name: "RickAndMortyCharacter",
        props: ["character"],
        data() {
            return {
                
            };
        },
    }
</script>