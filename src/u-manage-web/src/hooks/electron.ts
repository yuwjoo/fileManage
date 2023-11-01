import { onBeforeUnmount } from "vue";

export interface ListenerOptions {
  immediate?: boolean;
}

export interface ConnectOptions {
  onmessage?: Function;
  onerror?: Function;
  onclose?: Function;
}

export interface ConnectReturn {
  send: Function;
  close: Function;
}

const electronApi = window.electronApi;

/**
 * @description: 是electron环境
 * @return {boolean} 判断结果
 */
export function isElectronEnv(): boolean {
  return !!electronApi;
}

/**
 * @description: 监听事件
 * @param {string} name 事件名
 * @param {Function} callback 回调函数
 * @param {ListenerOptions} options 配置
 */
export function useElectronListener(
  name: string,
  callback: Function,
  options?: ListenerOptions
): void {
  const listener = electronApi.addListener(name, callback, options);
  onBeforeUnmount(() => {
    listener.remove();
  });
}

/**
 * @description: 发送请求
 * @param {string} name 请求名
 * @param {any} parmas 参数
 * @return {Promise<any>} 返回结果
 */
export function useElectronRequest(name: string, parmas?: any): Promise<any> {
  return electronApi.request(name, parmas);
}

/**
 * @description: 建立连接
 * @param {string} name 连接名
 * @param {any} parmas 参数
 * @param {ConnectOptions} options 配置项
 * @return {ConnectReturn} 操作对象
 */
export function useElectronConnect(
  name: string,
  parmas?: any,
  options?: ConnectOptions
): ConnectReturn {
  return electronApi.connect(name, parmas, options);
}
