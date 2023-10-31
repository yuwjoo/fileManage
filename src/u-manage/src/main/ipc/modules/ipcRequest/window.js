const { BrowserWindow } = require("electron");

module.exports = {
  /**
   * @description: 窗口最大化
   * @param {Object} event 事件对象
   * @param {Object} options 配置
   */
  maximize(event) {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.maximize();
  },
  /**
   * @description: 窗口最小化
   * @param {Object} event 事件对象
   * @param {Object} options 配置
   */
  minimize(event) {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.minimize();
  },
  /**
   * @description: 窗口还原
   * @param {Object} event 事件对象
   * @param {Object} options 配置
   */
  restore(event) {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.restore();
  },
  /**
   * @description: 窗口关闭
   * @param {Object} event 事件对象
   * @param {Object} options 配置
   */
  close(event) {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.close();
  },
  /**
   * @description: 设置窗口全屏状态
   * @param {Object} event 事件对象
   * @param {Object} options 配置
   */
  setFullScreen(event, options) {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.setFullScreen(options.params);
  },
};
