import { createRouter, createWebHistory } from "vue-router";

import HelloWorld from "../views/pages/HelloWorld.vue";
import TheWelcome from "../views/pages/TheWelcome.vue";
import RickAndMorty from "../views/pages/RickAndMorty.vue";
import WallPaper from "../views/pages/WallPaper.vue";
import Login from "../views/auth/login.vue";
import TodoItems from "../views/pages/TodoItems.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: TheWelcome,
  },
  
  {
    path: "/HelloWorld",
    name: "HelloWorld",
    component: HelloWorld,
  },
  
  {
    path: "/RickAndMorty",
    name: "RickAndMorty",
    component: RickAndMorty,
  },

  {
    path: "/WallPaper",
    name: "WallPaper",
    component: WallPaper,
  },
  
  {
    path: "/TodoItems",
    name: "TodoItems",
    component: TodoItems,
  },
  
  {
    path: "/auth/Login",
    name: "Login",
    component: Login,
  },
 
];


const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  //historyApiFallback: true,
  routes,
  linkActiveClass: "navActive",
  linkExactActiveClass: "navActive",

});

export default router;
