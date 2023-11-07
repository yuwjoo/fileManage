import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import type { App } from "vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/views/layout/index.vue"),
    redirect: { name: "home" },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
];

/**
 * @description: 初始化 router
 * @param {App} app 应用
 */
export function initRouter(app: App): void {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  app.use(router);
}
