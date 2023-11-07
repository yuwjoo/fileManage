import { createApp } from "vue";
import "./style.css";
import "element-plus/theme-chalk/dark/css-vars.css"; // 暗系主题
import App from "./App.vue";
import { initPinia } from "./stores";
import { initRouter } from "./router";

const app = createApp(App);

initPinia(app);
initRouter(app);

app.mount("#app");
