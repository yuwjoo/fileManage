/*
 * @FileName: 路由配置
 * @FilePath: \fileManage\src\renderer\router\index.js
 * @Author: YH
 * @Date: 2023-07-07 11:24:28
 * @LastEditors: YH
 * @LastEditTime: 2023-10-10 15:16:40
 * @Description:
 * meta参数：
 *     title: 页面标题
 */
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
        name: "copywriting",
      },
      children: [
        {
          path: "/copywriting",
          name: "copywriting",
          component: () =>
            import(/* webpackChunkName: "copywriting" */ "@/views/copywriting"),
          meta: {
            title: "文案",
          },
        },
        {
          path: "/dub",
          name: "dub",
          component: () =>
            import(/* webpackChunkName: "dub" */ "@/views/dub"),
          meta: {
            title: "配音",
          },
        },
        {
          path: "/audioFrequency",
          name: "audioFrequency",
          component: () =>
            import(/* webpackChunkName: "audioFrequency" */ "@/views/audioFrequency"),
          meta: {
            title: "音频",
          },
        },
        {
          path: "/sourceMaterial",
          name: "sourceMaterial",
          component: () =>
            import(/* webpackChunkName: "sourceMaterial" */ "@/views/sourceMaterial"),
          meta: {
            title: "素材",
          },
        },
        {
          path: "/integration",
          name: "integration",
          component: () =>
            import(/* webpackChunkName: "integration" */ "@/views/integration"),
          meta: {
            title: "整合",
          },
        },
        {
          path: "/publish",
          name: "publish",
          component: () =>
            import(/* webpackChunkName: "publish" */ "@/views/publish"),
          meta: {
            title: "发布",
          },
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
