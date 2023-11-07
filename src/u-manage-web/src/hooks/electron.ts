import { onBeforeUnmount } from "vue";
import type { App } from "vue";

interface ListenerOptions {
  immediate?: boolean;
}

interface ConnectOptions {
  onmessage?: Function;
  onerror?: Function;
  onclose?: Function;
}

interface ConnectReturn {
  send: Function;
  close: Function;
}

class Electron {
  #electronApi?: { [key: string]: any }; // api对象
  isElectronEnv: boolean; // 是否是electron环境

  constructor() {
    this.#electronApi = window.electronApi;
    this.isElectronEnv = !!this.#electronApi;
  }

  /**
   * @description: 监听事件
   * @param {string} name 事件名
   * @param {Function} callback 回调函数
   * @param {ListenerOptions} options 配置
   */
  listener(name: string, callback: Function, options?: ListenerOptions): void {
    const listener = this.#electronApi!.addListener(name, callback, options);
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
  request(name: string, parmas?: any): Promise<any> {
    return this.#electronApi!.request(name, parmas);
  }

  /**
   * @description: 建立连接
   * @param {string} name 连接名
   * @param {any} parmas 参数
   * @param {ConnectOptions} options 配置项
   * @return {ConnectReturn} 操作对象
   */
  connect(name: string, parmas?: any, options?: ConnectOptions): ConnectReturn {
    return this.#electronApi!.connect(name, parmas, options);
  }
}

let electron: Electron;

/**
 * @description: 初始化 electron
 * @param {App} app vue应用实例
 */
export function initElectron(app: App): void {
  electron = new Electron();
  app.config.globalProperties.$electron = electron;
}

/**
 * @description: electron hook 入口
 * @return {Electron} electron实例
 */
export function useElectron(): Electron {
  return electron;
}
