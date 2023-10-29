const { ipcMain, BrowserWindow } = require("electron");

/**
 * @description: 初始化IPC消息接收函数
 */
function initIPCReceive() {
  /**
   * @description: 窗口最大化
   */
  ipcMain.on("windowMaximize", ({ sender }) => {
    const win = BrowserWindow.fromWebContents(sender);
    win.maximize();
  });

  /**
   * @description: 窗口最小化
   */
  ipcMain.on("windowMinimize", ({ sender }) => {
    const win = BrowserWindow.fromWebContents(sender);
    win.minimize();
  });

  /**
   * @description: 窗口还原
   */
  ipcMain.on("windowRestore", ({ sender }) => {
    const win = BrowserWindow.fromWebContents(sender);
    win.restore();
  });

  /**
   * @description: 设置窗口全屏状态
   */
  ipcMain.on("windowSetFullScreen", ({ sender }, isFull) => {
    const win = BrowserWindow.fromWebContents(sender);
    win.setFullScreen(isFull);
  });
}

module.exports = { initIPCReceive };
