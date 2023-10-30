require("module-alias/register");
const { app, BrowserWindow } = require("electron");
const { initMainWindow } = require("./mainWindow");
const { initIPCReceive } = require("./ipc/ipcReceive");

// 热更新
try {
  require("electron-reloader")(module, {});
} catch (_) {}

// 初始化IPC接收函数
initIPCReceive();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

// 应用程序初始化完成
app.on("ready", () => {
  initMainWindow();
});

// 应用程序被激活
app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    initMainWindow();
  }
});

// 所有窗口被关闭
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
