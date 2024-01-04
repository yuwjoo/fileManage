import type { ActionIPCPostMessage, ActionOptions } from "@/types/preload";
import { BrowserWindow, ipcMain } from "electron";

const actionList = {
  /**
   * @description: 窗口最大化
   * @param {Electron.IpcMainEvent} event 事件对象
   */
  windowMaximize(event: Electron.IpcMainEvent) {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return;
    win.maximize();
  },
  /**
   * @description: 窗口最小化
   * @param {Electron.IpcMainEvent} event 事件对象
   */
  windowMinimize(event: Electron.IpcMainEvent) {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return;
    win.minimize();
  },
  /**
   * @description: 窗口还原
   * @param {Electron.IpcMainEvent} event 事件对象
   */
  windowRestore(event: Electron.IpcMainEvent) {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return;
    win.restore();
  },
  /**
   * @description: 窗口关闭
   * @param {Electron.IpcMainEvent} event 事件对象
   */
  windowClose(event: Electron.IpcMainEvent) {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return;
    win.close();
  },
  /**
   * @description: 设置窗口全屏状态
   * @param {Electron.IpcMainEvent} event 事件对象
   * @param {ActionOptions} options 配置
   */
  windowSetFullScreen(event: Electron.IpcMainEvent, options: ActionOptions) {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return;
    win.setFullScreen(options?.full);
  },
  /**
   * @description: 打开控制台
   * @param {Electron.IpcMainEvent} event 事件对象
   */
  windowOpenDevTools(event: Electron.IpcMainEvent) {
    event.sender.openDevTools();
  },
} as Record<string, any>;

/**
 * @description: 动作 hook
 */
export function useAction() {
  ipcMain.on("action", (event, data: ActionIPCPostMessage) => {
    if (!actionList[data.name]) {
      console.error(`不存在的动作事件：${data.name}`);
      return;
    }
    actionList[data.name](event, data.options);
  });
}
