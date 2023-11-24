import { onBeforeUnmount } from 'vue';
import type { App } from 'vue';
import type {
  ElectronApi,
  Electron as ElectronType,
  ListenerOptions,
  ConnectionOptions,
  ConnectOptions
} from '@/types/hooks/electron';

class Electron implements ElectronType {
  #electronApi: ElectronApi | undefined;
  isElectronEnv: boolean;

  constructor() {
    this.#electronApi = window.electronApi;
    this.isElectronEnv = !!this.#electronApi;
  }

  /**
   * @description: 监听事件
   * @param {string} name 事件名
   * @param {(data: any) => void} callback 回调函数
   * @param {ListenerOptions} options 配置
   * @return {string} 事件名
   */
  listener(name: string, callback: (data: any) => void, options?: ListenerOptions): void {
    if (!this.#electronApi) {
      throw new Error('Electron API is not available');
    }
    const listener = this.#electronApi.addListener(name, callback, options);
    onBeforeUnmount(() => {
      listener.remove();
    });
  }

  /**
   * @description: 发送请求
   * @param {string} name 请求名
   * @param {Record<string, unknown>} params 参数
   * @return {Promise<any>} 返回结果
   */
  request(name: string, params?: Record<string, unknown>): Promise<any> {
    if (!this.#electronApi) {
      throw new Error('Electron API is not available');
    }
    return this.#electronApi.request(name, params);
  }

  /**
   * @description: 建立连接
   * @param {string} name 连接名
   * @param {Record<string, unknown>} params 参数
   * @param {ConnectOptions} options 配置项
   * @return {ConnectionOptions} 操作对象
   */
  connect(
    name: string,
    params?: Record<string, unknown>,
    options?: ConnectOptions
  ): ConnectionOptions {
    if (!this.#electronApi) {
      throw new Error('Electron API is not available');
    }
    return this.#electronApi.connect(name, params, options);
  }
}

let electron: Electron;

/**
 * @description: 创建 electron
 * @return {(app: App) => void} 安装程序
 */
export function createElectron(): (app: App) => void {
  return (app: App) => {
    electron = new Electron();
    app.config.globalProperties.$electron = electron;
  };
}

/**
 * @description: 使用 electron
 * @return {Electron} electron实例
 */
export function useElectron(): Electron {
  return electron;
}
