import { onBeforeUnmount } from "vue";

const electronApi = window.electronApi;

/**
 * @description: 监听事件
 * @param {string} name 事件名
 * @param {Function} callback 回调函数
 */
export function useElectronListener(name: string, callback: Function): void {
  if (!electronApi) return;
  const listener = electronApi.addListener(name, callback);
  onBeforeUnmount(() => {
    listener.remove();
  });
}

/**
 * @description: 发送请求
 * @param {string} name 请求名
 * @param {any} parmas 参数
 * @return {Promise<any>} 请求结果
 */
export function useElectronRequest(name: string, parmas: any): Promise<any> {
  if (!electronApi) return Promise.reject();
  return electronApi.request(name, parmas);
}

/**
 * @description: 建立连接
 * @param {string} name 连接名
 * @param {any} parmas 参数
 * @param {object} options 配置项
 * @return {Object} 操作对象
 */
export function useElectronConnect(
  name: string,
  parmas: any,
  options:
    | { onmessage?: Function; onerror?: Function; onclose?: Function }
    | undefined
): { send: Function; close: Function } {
  if (!electronApi) return { send: () => {}, close: () => {} };
  return electronApi.connect(name, parmas, options);
}
