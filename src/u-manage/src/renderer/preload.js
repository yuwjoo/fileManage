const { contextBridge, ipcRenderer } = require("electron");

const window = {
  maximize: () => ipcRenderer.send("windowMaximize"), // 窗口最大化
  minimize: () => ipcRenderer.send("windowMinimize"), // 窗口最小化
  restore: () => ipcRenderer.send("windowRestore"), // 窗口还原
  onChangeMaximize: (callback) => ipcRenderer.on("changeMaximize", callback), // 监听最大化状态改变
};

const request = {};

contextBridge.exposeInMainWorld("electronApi", {
  window,
  test: (callback) => ipcRenderer.on("test", callback), // 测试
});

// const electronApi = {
//   getWindowMaximized: () => ipcRenderer.invoke("get-window-maximized"), // 获取窗口尺寸状态
//   getList: (value) => ipcRenderer.invoke("get-list", value), // 获取数据列表
//   saveList: (value) => ipcRenderer.invoke("save-list", value), // 保存数据列表
//   openMenu: (value) => ipcRenderer.send("open-menu", value), // 打开菜单
//   onNewData: (callback) => ipcRenderer.on("new-data", callback), // 监听新增数据事件
//   openDataDir: (value) => ipcRenderer.send("open-data-dir", value), // 打开数据目录
//   getDataGuideList: (value) => ipcRenderer.invoke("get-data-guide-list", value), // 获取指南文件列表
//   getDataGuideContent: (value) =>
//     ipcRenderer.invoke("get-data-guide-content", value), // 获取指南文件内容
//   deleteData: (value) => ipcRenderer.invoke("delete-data", value), // 删除数据
// };
