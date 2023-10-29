const { app, BrowserWindow } = require("electron");
const path = require("path");
const { changeMaximize, changeFullScreen } = require("@/main/ipc/ipcSend");

/**
 * @description: 初始化主窗口
 */
function initMainWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "../../renderer/preload.js"),
    },
  });

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, "../../renderer/web/index.html"));
  } else {
    // and load the index.html of the app.
    mainWindow.loadURL("http://localhost:5173/");
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("maximize", () => changeMaximize(mainWindow, true));
  mainWindow.on("unmaximize", () => changeMaximize(mainWindow, false));
  mainWindow.on("enter-full-screen", () => changeFullScreen(mainWindow, true));
  mainWindow.on("leave-full-screen", () => changeFullScreen(mainWindow, false));
}

module.exports = { initMainWindow };
