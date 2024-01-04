import { app, BrowserWindow } from "electron";
import { join } from "path";

/**
 * @description: 创建主窗口
 */
export function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    frame: false,
    webPreferences: {
      preload: join(__dirname, "./preload.js"),
    },
  });

  if (app.isPackaged) {
    mainWindow.loadFile(join(__dirname, "./renderer/index.html"));
  } else {
    mainWindow.loadURL("http://localhost:5173/");
    mainWindow.webContents.openDevTools();
  }
}
