const { ipcMain, Menu, shell } = require("electron");
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
    const sourceDir = path.resolve(rootDir, "source");
    const guideDir = path.resolve(rootDir, "guide");
    if (!fs.existsSync(rootDir)) {
      fs.mkdirSync(rootDir, { recursive: true });
      fs.mkdirSync(sourceDir, { recursive: true });
      fs.mkdirSync(guideDir, { recursive: true });
    }
    value.sourceList.forEach((file) => {
      fs.copyFileSync(
        path.resolve(file.path),
        path.resolve(sourceDir, file.name)
      );
    });
    value.guideList.forEach((file) => {
      fs.copyFileSync(
        path.resolve(file.path),
        path.resolve(guideDir, file.name)
      );
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

  // 打开文件
  ipcMain.on("open-data-dir", (event, value) => {
    const dirPath = path.resolve(workspacePath, value);
    shell.openPath(dirPath);
  });

  // 获取指南文件列表
  ipcMain.handle("get-data-guide-list", (event, value) => {
    const target = getIndexData().find((item) => item.title === value);
    return target.guideList;
  });

  // 获取指南文件内容
  ipcMain.handle("get-data-guide-content", (event, value) => {
    const filePath = path.resolve(
      workspacePath,
      value.title,
      "guide",
      value.guide
    );
    const content = fs.readFileSync(filePath, { encoding: "utf-8" });
    return content;
  });

  // 删除数据
  ipcMain.handle("delete-data", (event, value) => {
    const list = getIndexData();
    const targetIndex = list.findIndex((item) => item.title === value);
    if (targetIndex !== -1) {
      fs.rmSync(path.resolve(workspacePath, value), { recursive: true });
      list.splice(targetIndex, 1);
      setIndexData(list);
    }
  });
};
