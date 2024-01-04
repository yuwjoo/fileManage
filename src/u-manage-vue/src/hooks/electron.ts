import { onBeforeUnmount } from 'vue';
import type { App } from 'vue';
import type {
  ListenerOptions,
  ConnectOptions,
  ListenerCallback,
  ActionOptions,
  RequestParams,
  ConnectReturn,
  ConnectParams
} from '@/types/hooks/electron';

let electronIns: InstanceType<typeof Electron>;

class Electron {
  /**
   * @description: 是否可用
   * @return {boolean} isAvailable
   */
  get isAvailable(): boolean {
    return !!window.electronApi;
  }

  /**
   * @description: 监听事件
   * @param {string} name 名称
   * @param {ListenerCallback} callback 回调函数
   * @param {ListenerOptions} options 配置
   */
  listener(name: string, callback: ListenerCallback, options?: ListenerOptions) {
    if (!this.isAvailable) {
      throw new Error('Electron API is not available');
    }
    const listener = window.electronApi.listener(name, callback, options);
    onBeforeUnmount(() => {
      listener.remove();
    });
  }

  /**
   * @description: 执行动作
   * @param {string} name 名称
   * @param {ActionOptions} options 配置
   */
  action(name: string, options?: ActionOptions) {
    if (!this.isAvailable) {
      throw new Error('Electron API is not available');
    }
    window.electronApi.action(name, options);
  }

  /**
   * @description: 发送请求
   * @param {string} name 名称
   * @param {RequestParams} params 参数
   * @return {Promise<any>} 请求结果
   */
  request(name: string, params?: RequestParams): Promise<any> {
    if (!this.isAvailable) {
      throw new Error('Electron API is not available');
    }
    return window.electronApi.request(name, params);
  }

  /**
   * @description: 建立连接
   * @param {string} name 名称
   * @param {ConnectParams} params 参数
   * @param {ConnectOptions} options 配置项
   * @return {ConnectReturn} 连接对象
   */
  connect(name: string, params?: ConnectParams, options?: ConnectOptions): ConnectReturn {
    if (!this.isAvailable) {
      throw new Error('Electron API is not available');
    }
    return window.electronApi.connect(name, params, options);
  }
}

/**
 * @description: 创建 electron
 */
export function createElectron() {
  return {
    install: (app: App) => {
      electronIns = new Electron();
      app.config.globalProperties.$electron = electronIns;
    }
  };
}

/**
 * @description: 使用 electron
 */
export function useElectron() {
  return electronIns;
}
