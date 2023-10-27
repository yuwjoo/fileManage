const { ipcMain, ipcRenderer, contextBridge } = require("electron");
const modules = {
  system: require("./modules/system"),
  resource: require("./modules/resource"),
  types: require("./modules/types"),
};

let electronApi = {};

Object.keys(modules).forEach((moduleName) => {
  Object.keys(modules[moduleName]).forEach((apiName) => {
    const { type, handler } = modules[moduleName][apiName];
    const name = `${moduleName}/${apiName}`;
    const sendType = type === "on" ? "send" : "invoke";
    ipcMain[type](name, handler);
    electronApi[name] = (...arg) => ipcRenderer[sendType](name, ...arg);
  });
});
contextBridge.exposeInMainWorld("electronApi", electronApi);
