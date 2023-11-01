const { BrowserWindow } = require("electron");

exports.listener = {
  /**
   * @description: 窗口最大化状态改变
   * @param {Object} event 事件对象
   * @param {Object} options 配置
   */
  ["window:changeMaximize"](event, options) {
    const win = BrowserWindow.fromWebContents(event.sender);
    const handlerMaximize = () => options.callback(true);
    const handlerNotMaximize = () => options.callback(false);
    win.on("maximize", handlerMaximize);
    win.on("unmaximize", handlerNotMaximize);
    if (options.immediate) options.callback(win.isMaximized());
    options.onremove = () => {
      win.removeListener("maximize", handlerMaximize);
      win.removeListener("unmaximize", handlerNotMaximize);
    };
  },
  /**
   * @description: 窗口全屏状态改变
   * @param {Object} event 事件对象
   * @param {Object} options 配置
   */
  ["window:changeFullScreen"](event, options) {
    const win = BrowserWindow.fromWebContents(event.sender);
    const handlerFullScreen = () => options.callback(true);
    const handlerNotFullScreen = () => options.callback(false);
    win.on("enter-full-screen", handlerFullScreen);
    win.on("leave-full-screen", handlerNotFullScreen);
    if (options.immediate) options.callback(win.isFullScreen());
    options.onremove = () => {
      win.removeListener("enter-full-screen", handlerFullScreen);
      win.removeListener("leave-full-screen", handlerNotFullScreen);
    };
  },
};

exports.request = {
  /**
   * @description: 窗口最大化
   * @param {Object} event 事件对象
   * @param {Object} options 配置
   */
  ["window:maximize"](event) {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.maximize();
  },
  /**
   * @description: 窗口最小化
   * @param {Object} event 事件对象
   * @param {Object} options 配置
   */
  ["window:minimize"](event) {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.minimize();
  },
  /**
   * @description: 窗口还原
   * @param {Object} event 事件对象
   * @param {Object} options 配置
   */
  ["window:restore"](event) {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.restore();
  },
  /**
   * @description: 窗口关闭
   * @param {Object} event 事件对象
   * @param {Object} options 配置
   */
  ["window:close"](event) {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.close();
  },
  /**
   * @description: 设置窗口全屏状态
   * @param {Object} event 事件对象
   * @param {Object} options 配置
   */
  ["window:setFullScreen"](event, options) {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.setFullScreen(options.params);
  },
};

exports.connect = {};
