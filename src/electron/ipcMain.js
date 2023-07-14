const { ipcMain } = require("electron");

module.exports = (win) => {
  // 返回窗口最大化状态
  ipcMain.handle("get-window-maximized", () => {
    return win.isMaximized();
  });

  // 接收最大化命令，返回窗口最大化状态
  ipcMain.handle("window-max", () => {
    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize();
    }
    return win.isMaximized();
  });

  // 接收最小化命令
  ipcMain.on("window-min", () => {
    win.minimize();
  });

  // 关闭窗口
  ipcMain.on("window-close", () => {
    win.close();
  });
};
