import { contextBridge, ipcRenderer } from "electron";
import type {
  ActionIPCPostMessage,
  ActionOptions,
  ListenerCallback,
  ListenerIPCPostMessage,
  ListenerOptions,
  ListenerPortPostMessage,
  ListenerReturn,
  RequestIPCPostMessage,
  RequestParams,
  RequestReturn,
} from "@/types/preload";

const version: string = process.versions.electron; // electron当前版本

/**
 * @description: 监听事件
 * @param {String} name 事件名称
 * @param {ListenerCallback} callback 回调函数
 * @param {ListenerOptions} options 配置对象
 * @return {ListenerReturn} 事件对象
 */
function listener(
  name: string,
  callback: ListenerCallback,
  options: ListenerOptions
): ListenerReturn {
  const { port1, port2 } = new MessageChannel();
  const remove = () =>
    port1.postMessage({ type: "remove" } as ListenerPortPostMessage);
  port1.onmessage = (ev) => callback(ev.data);
  ipcRenderer.postMessage(
    "listener",
    { name, options } as ListenerIPCPostMessage,
    [port2]
  );
  return { remove };
}

/**
 * @description: 执行动作
 * @param {string} name 动作名称
 * @param {ActionOptions} options 配置对象
 */
function action(name: string, options: ActionOptions) {
  ipcRenderer.send("action", { name, options } as ActionIPCPostMessage);
}

/**
 * @description: 发送请求
 * @param {string} name 请求名称
 * @param {RequestParams} params 参数
 * @return {RequestReturn} 请求结果
 */
function request(name: string, params: RequestParams): RequestReturn {
  return ipcRenderer.invoke("request", {
    name,
    params,
  } as RequestIPCPostMessage);
}

contextBridge.exposeInMainWorld("electronApi", {
  version,
  listener,
  action,
  request,
});
