const { app, BrowserWindow } = require("electron");
const path = require("path");
console.log("process.env.NODeeEN43V");
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.webContents.openDevTools();

  if (process.env.NODE_ENV === "production") {
    win.loadFile("renderer/index.html");
  } else {
    win.loadURL("http://127.0.0.1:9091");
  }
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
