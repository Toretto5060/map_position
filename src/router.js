import Vue from "vue";
import Router from "vue-router";
import Home from "./view/index.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: Home
    }
  ]
});
