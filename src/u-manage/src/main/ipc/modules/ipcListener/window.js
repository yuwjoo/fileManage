const { BrowserWindow } = require("electron");

module.exports = {
  /**
   * @description: 窗口最大化状态改变
   * @param {Object} event 事件对象
   * @param {Object} options 配置
   */
  changeMaximize(event, options) {
    const win = BrowserWindow.fromWebContents(event.sender);
    const handlerMaximize = () => options.callback(true);
    const handlerNotMaximize = () => options.callback(false);
    win.on("maximize", handlerMaximize);
    win.on("unmaximize", handlerNotMaximize);
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
  changeFullScreen(event, options) {
    const win = BrowserWindow.fromWebContents(event.sender);
    const handlerFullScreen = () => options.callback(true);
    const handlerNotFullScreen = () => options.callback(false);
    win.on("enter-full-screen", handlerFullScreen);
    win.on("leave-full-screen", handlerNotFullScreen);
    options.onremove = () => {
      win.removeListener("enter-full-screen", handlerFullScreen);
      win.removeListener("leave-full-screen", handlerNotFullScreen);
    };
  },
};
