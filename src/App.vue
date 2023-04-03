<template>

  <navbar />

  <router-view />
  
</template>
<script>
import navbar from './components/header/navbar.vue'
export default {
  name: "App",
  data() {
    return {
      
    };
  },
  components: {
    navbar,
  },
  computed: {
  },
  beforeMount() {
  },
};
</script>