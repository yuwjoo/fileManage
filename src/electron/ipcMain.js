const { ipcMain, Menu } = require("electron");
const {
  getIndexData,
  setIndexData,
  workspacePath,
} = require("@/generate/workspace");
const path = require("path");
const fs = require("fs");

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

  // 获取数据列表
  ipcMain.handle("get-list", () => {
    return getIndexData();
  });

  // 保存数据列表
  ipcMain.handle("save-list", (event, value) => {
    const oldList = getIndexData();
    const pos = oldList.findIndex((v) => v.id === value.id);

    const rootDir = path.resolve(workspacePath, value.title);
    if (!fs.existsSync(rootDir)) {
      fs.mkdirSync(rootDir, { recursive: true });
    }
    value.fileList.forEach((file) => {
      fs.copyFileSync(path.resolve(file.url), path.resolve(rootDir, file.name));
    });

    if (pos !== -1) {
      oldList.splice(pos, 1, value);
      return setIndexData(oldList);
    } else {
      value.id = oldList.length + 1;
      return setIndexData(oldList.concat([value]));
    }
  });

  // 打开菜单
  ipcMain.on("open-menu", (event, value) => {
    if (value === "file") {
      Menu.getApplicationMenu().popup({ window: win, x: 30, y: 30 });
    }
  });
};
