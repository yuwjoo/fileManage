import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import "@/assets/css/theme.css"; // 主题css
import "@/assets/css/style.scss"; // 全局样式

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
