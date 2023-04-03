import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'flowbite/dist/flowbite.min.js';

// All JS Files
// All CSS Files
import './assets/css/main.css';
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const appInstance = createApp(App);
appInstance.use(router);

appInstance.mount('#app');
