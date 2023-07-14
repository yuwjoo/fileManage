const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  windowMax: () => ipcRenderer.invoke("window-max"),
  windowMin: () => ipcRenderer.send("window-min"),
  windowClose: () => ipcRenderer.send("window-close"),
  getWindowMaximized: () => ipcRenderer.invoke("get-window-maximized"),
});
