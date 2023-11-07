import { createPinia } from "pinia";
import type { App } from "vue";

/**
 * @description: 初始化 pinia
 * @param {App} app 应用
 */
export function initPinia(app: App): void {
  const pinia = createPinia();
  app.use(pinia);
}
