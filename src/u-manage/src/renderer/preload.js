const { contextBridge, ipcRenderer } = require("electron");

const window = {
  // 窗口最大化
  windowMaximize() {
    ipcRenderer.send("windowMaximize");
  },
  // 窗口最小化
  windowMinimize() {
    ipcRenderer.send("windowMinimize");
  },
  // 窗口还原
  windowRestore() {
    ipcRenderer.send("windowRestore");
  },
  // 窗口还关闭
  windowClose() {
    ipcRenderer.send("windowClose");
  },
  // 设置窗口全屏状态
  windowSetFullScreen(isFull) {
    ipcRenderer.send("windowSetFullScreen", isFull);
  },
  // 监听最大化状态改变
  onChangeMaximize(callback) {
    ipcRenderer.on("changeMaximize", callback);
  },
  // 监听全屏状态改变
  onChangeFullScreen(callback) {
    ipcRenderer.on("changeFullScreen", callback);
  },
};

const request = {
  /**
   * @description: 发送请求
   * @param {Object} params 参数
   * @param {Function} options.onProgress 进度回调
   * @param {Function} options.onMessage 消息回调
   * @param {Function} options.onAbort 消息回调
   * @return {Promise} 响应数据
   */
  messageChannel(params, options = {}) {
    const { port1, port2 } = new MessageChannel();
    const { onProgress, onMessage } = options || {};
    const abort = () => port1.postMessage({ abort: true });
    let timear = null;
    return new Promise((resolve, reject) => {
      ipcRenderer.postMessage("request", params, [port2]);
      port1.onmessage = ({ data }) => {
        clearTimeout(timear);
        timear = setTimeout(() => {}, params.timeout || )
        if (onProgress) onProgress(data.progress);
        if (onMessage) onMessage(data.message);
        if (data.state === "fulfilled") resolve(data.message);
        if (data.state === "rejected") reject(data.error);
      };
      
    });
  },
};

contextBridge.exposeInMainWorld("electronApi", { ...window, ...request });
