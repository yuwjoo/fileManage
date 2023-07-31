/*
 * @FileName: 路由配置
 * @FilePath: \fileManage\src\renderer\router\index.js
 * @Author: YH
 * @Date: 2023-07-07 11:24:28
 * @LastEditors: YH
 * @LastEditTime: 2023-07-31 17:03:29
 * @Description:
 * meta参数：
 *     title: 页面标题
 *     menupage: 是否菜单页
 *     custom: 自定义头部导航栏
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
        name: "store",
      },
      children: [
        {
          path: "/store",
          name: "store",
          component: () =>
            import(/* webpackChunkName: "store" */ "@/views/store"),
          meta: {
            title: "仓库",
            menupage: true,
          },
        },
        {
          path: "/temporaries",
          name: "temporaries",
          component: () =>
            import(/* webpackChunkName: "temporaries" */ "@/views/store1"),
          meta: {
            title: "临时区",
            menupage: true,
          },
        },
        {
          path: "/recycleBin",
          name: "recycleBin",
          component: () =>
            import(/* webpackChunkName: "recycleBin" */ "@/views/store"),
          meta: {
            title: "回收站",
            menupage: true,
          },
        },
        {
          path: "/markdown",
          name: "markdown",
          component: () =>
            import(/* webpackChunkName: "markdown" */ "@/views/markdown"),
          meta: {
            title: "Markdown",
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
