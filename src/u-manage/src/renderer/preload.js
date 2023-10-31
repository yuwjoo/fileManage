const { contextBridge, ipcRenderer } = require("electron");

/**
 * @description: 监听事件
 * @param {String} name 事件名称
 * @param {Function} callback 回调函数
 * @return {{remove}} 移除监听器函数
 */
function addListener(name, callback) {
  const { port1, port2 } = new MessageChannel();
  port1.onmessage = (event) => {
    callback(event.data);
  };
  ipcRenderer.postMessage("listener", { name }, [port2]);
  return {
    remove: () => {
      port1.postMessage({ remove: true });
    },
  };
}

/**
 * @description: 发送请求
 * @param {String} name 请求名称
 * @param {Object} params 参数
 * @return {Promise} 请求结果
 */
function request(name, params) {
  return ipcRenderer.invoke("request", { name, params });
}

/**
 * @description: 建立连接
 * @param {Object} name 连接名称
 * @param {Object} params 参数
 * @param {Function} options.onmessage 消息回调
 * @param {Function} options.onerror 异常回调
 * @param {Function} options.onclose 关闭回调
 * @return {{send, close}} send: 发送消息，close：关闭连接
 */
function connect(name, params, options = {}) {
  const { port1, port2 } = new MessageChannel();
  const send = (data) => {
    port1.postMessage({ data });
  };
  const close = () => {
    port1.postMessage({ close: true });
  };
  port1.onmessage = (event) => {
    const { data, code, msg } = event.data;
    if (code !== 200) {
      if (options.onerror) options.onerror({ code, msg }, { send, close });
    } else {
      if (options.onmessage) options.onmessage(data);
    }
  };
  port1.onclose = () => {
    if (options.onclose) options.onclose();
  };
  ipcRenderer.postMessage("connect", { name, params }, [port2]);
  return { send, close };
}

contextBridge.exposeInMainWorld("electronApi", {
  addListener,
  request,
  connect,
});
