const { app, BrowserWindow } = require("electron");
const path = require("path");
const ipcMain = require("@/ipcMain");
const isProduction = process.env.NODE_ENV === "production"; // 生产环境

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 675,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (!isProduction) {
    win.webContents.openDevTools();
  }

  if (isProduction) {
    win.loadFile("renderer/index.html");
  } else {
    win.loadURL("http://127.0.0.1:9091");
  }

  ipcMain(win);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
