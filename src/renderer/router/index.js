/*
 * @FileName: router
 * @FilePath: \fileManage\src\renderer\router\index.js
 * @Author: YH
 * @Date: 2023-07-07 11:24:28
 * @LastEditors: YH
 * @LastEditTime: 2023-10-13 13:46:38
 * @Description: 路由配置
 */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import initLayout from "./utils/initLayout"; // 页面路由
import initScrollBehavior from "./utils/initScrollBehavior"; // 页面滚动行为
import initPermission from "./utils/initPermission"; // 路由权限

Vue.use(VueRouter);

const vueRouterConfig = {
  routes: [initLayout()],
  scrollBehavior: initScrollBehavior(),
};
const router = new VueRouter(vueRouterConfig);

store.commit("router/setRoutes", vueRouterConfig.routes);
initPermission(router);

export default router;
