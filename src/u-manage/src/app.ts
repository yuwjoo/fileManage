import { app, BrowserWindow } from "electron";
import { useAction } from "@/hooks/action/action";
import { useListener } from "@/hooks/listener/listener";
import { useRequest } from "@/hooks/request/request";
import { createMainWindow } from "@/hooks/window/mainWindow";
import { createSqlite } from "@/sqlite/sqlite";

// 应用程序初始化完成
app.on("ready", () => {
  createSqlite();
  useAction();
  useListener();
  useRequest();
  createMainWindow();
});

// 应用程序被激活
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

// 所有窗口被关闭
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
