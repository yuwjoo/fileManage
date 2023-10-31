const { ipcMain } = require("electron");

const ipcListenerModules = {
  window: require("./modules/ipcListener/window"),
};

const ipcRequestModules = {
  window: require("./modules/ipcRequest/window"),
};

const ipcConnectModules = {
  window: require("./modules/ipcConnect/window"),
};

/**
 * @description: 获取处理函数
 * @param {String} name 名称
 * @param {Object} modules 模块对象
 * @return {Function|null} 处理函数
 */
function getHandleFun(name, modules) {
  const [rootName, eventName] = name.split("/");
  if (!modules[rootName] || !modules[rootName][eventName]) return;
  return modules[rootName][eventName];
}

/**
 * @description: 处理监听
 */
function onListener(event, { name }) {
  const handler = getHandleFun(name, ipcListenerModules);
  if (!handler) return;
  const replyPort = event.ports[0];
  const options = {
    callback: replyPort.postMessage.bind(replyPort),
    onremove: null,
  };
  replyPort.start();
  replyPort.onmessage = ({ data }) => {
    if (data.remove) {
      replyPort.close();
      if (options.onremove) options.onremove();
    }
  };
  handler(event, options);
}

/**
 * @description: 处理请求
 */
function onRequest(event, { name, params }) {
  const handler = getHandleFun(name, ipcRequestModules);
  if (!handler) return;
  return handler(event, { params });
}

/**
 * @description: 处理连接
 */
function onConnect(event, { name, params }) {
  const handler = getHandleFun(name, ipcConnectModules);
  if (!handler) return;
  const replyPort = event.ports[0];
  const options = {
    postMessage: (data) => replyPort.postMessage({ code: 200, data }),
    postError: (code, msg) => replyPort.postMessage({ code, msg }),
    close: () => replyPort.close(),
    onclose: null,
    onmessage: null,
    params,
  };
  replyPort.start();
  replyPort.onmessage = ({ data }) => {
    if (data.close) {
      replyPort.close();
      if (options.onclose) options.onclose();
    } else {
      if (options.onmessage) options.onmessage(data.data);
    }
  };
  handler(event, options);
}

/**
 * @description: 初始化
 */
function initIPC() {
  ipcMain.on("listener", onListener);
  ipcMain.on("request", onRequest);
  ipcMain.on("connect", onConnect);
}

module.exports = { initIPC };
