import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import { useIconFont } from "@/library/useIconFont"; // 图标组件
import { useElementUI } from "@/library/useElementUI"; // element-ui组件库
import "@/assets/css/theme.css"; // 主题css
import "@/assets/css/style.scss"; // 全局样式

Vue.config.productionTip = false;

Vue.prototype.$electron = window.electronAPI; // 挂载 electron api

useIconFont(Vue);
useElementUI(Vue);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
