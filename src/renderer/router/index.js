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
          path: "/abort",
          name: "abort",
          component: () =>
            import(/* webpackChunkName: "abort" */ "@/views/abort"),
        },
      ],
    },
  ],
});

export default router;
