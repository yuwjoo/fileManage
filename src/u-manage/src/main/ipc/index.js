const { ipcMain } = require("electron");

/**
 * @description: 初始化模块数据
 * @return {Object} 模块数据
 */
function initModule() {
  const moduleList = [
    require("./modules/window"),
    require("./modules/category"),
  ];
  return moduleList.reduce(
    (obj, module) => {
      return {
        listener: { ...obj.listener, ...module.listener },
        request: { ...obj.request, ...module.request },
        connect: { ...obj.connect, ...module.connect },
      };
    },
    { listener: {}, request: {}, connect: {} }
  );
}

/**
 * @description: 处理监听
 */
function onListener(listener, event, data) {
  if (!listener[data.name]) {
    console.error(`不存在的监听事件：${data.name}`);
    return;
  }
  const replyPort = event.ports[0];
  const options = {
    callback: replyPort.postMessage.bind(replyPort),
    onremove: null,
    immediate: data.options?.immediate,
  };
  replyPort.start();
  replyPort.on("message", ({ data }) => {
    if (data.remove) {
      replyPort.close();
      options.onremove?.();
    }
  });
  listener[data.name](event, options);
}

/**
 * @description: 处理请求
 */
function onRequest(request, event, data) {
  if (!request[data.name]) {
    console.error(`不存在的请求事件：${data.name}`);
    return;
  }
  const options = { params: data.params };
  return request[data.name](event, options);
}

/**
 * @description: 处理连接
 */
function onConnect(connect, event, data) {
  if (!connect[data.name]) {
    console.error(`不存在的连接事件：${data.name}`);
    return;
  }
  const replyPort = event.ports[0];
  const options = {
    postMessage: (data) => replyPort.postMessage({ code: 200, data }),
    postError: (code, msg) => replyPort.postMessage({ code, msg }),
    close: () => replyPort.close(),
    onclose: null,
    onmessage: null,
    params: data.params,
  };
  replyPort.start();
  replyPort.on("message", ({ data }) => {
    if (data.close) {
      replyPort.close();
      options.onclose?.();
    } else {
      options.onmessage?.(data.data);
    }
  });
  connect[data.name](event, options);
}

/**
 * @description: 初始化
 */
function initIPC() {
  const module = initModule();
  ipcMain.on("listener", onListener.bind(null, module.listener));
  ipcMain.handle("request", onRequest.bind(null, module.request));
  ipcMain.on("connect", onConnect.bind(null, module.connect));
}

module.exports = { initIPC };
