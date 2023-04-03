<template>
  <section class="py-20 text-center text-white">
    <div class="container">
      <h1 class="text-[60px] mb-5">You Did It</h1>
      <h3>
        You’ve successfully created a project with
        <a href="https://vitejs.dev/" target="_blank" rel="noopener" class="text-primary-600 hover:text-primary-400 transition-all">Vite</a> +
        <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
      </h3>
    </div>
  </section>
</template>
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      
    };
  },
  created () {
    document.title = "Hello World";
  }
}
</script>
