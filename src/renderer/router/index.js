import Vue from "vue";
import VueRouter from "vue-router";
import layout from "@/layout";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "layout",
      component: layout,
      redirect: {
        name: "home",
      },
      children: [
        {
          path: "/home",
          name: "home",
          component: () =>
            import(/* webpackChunkName: "home" */ "@/views/home"),
        },
        {
          path: "/markdown",
          name: "markdown",
          component: () =>
            import(/* webpackChunkName: "markdown" */ "@/views/markdown"),
        },
      ],
    },
  ],
});

export default router;
