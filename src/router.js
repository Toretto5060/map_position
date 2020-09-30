import Vue from "vue";
import Router from "vue-router";
import Home from "./views/index.vue";
import camrea_index from "./views/camrea_index.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: Home,
      redirect:'/camrea_index',
      children:[{
        path:'camrea_index',
        name:'camrea_index',
        component:camrea_index
      }]

    }
  ]
});
