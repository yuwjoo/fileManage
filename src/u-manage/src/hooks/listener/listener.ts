import type {
  ListenerCallback,
  ListenerIPCPostMessage,
  ListenerOptions,
} from "@/types/preload";
import { BrowserWindow, ipcMain } from "electron";

/**
 * @description: 监听窗口最大化改变
 */
class WindowChangeMaximizeListener {
  win: Electron.BrowserWindow | null;
  handlerMaximize: () => void;
  handlerNotMaximize: () => void;

  constructor(
    event: Electron.IpcMainEvent,
    callback: ListenerCallback,
    options: ListenerOptions
  ) {
    this.win = BrowserWindow.fromWebContents(event.sender);
    this.handlerMaximize = () => {
      callback(true);
    };
    this.handlerNotMaximize = () => {
      callback(false);
    };
    if (!this.win) return;
    if (options?.immediate) callback(this.win.isMaximized());
    this.win.on("maximize", this.handlerMaximize);
    this.win.on("unmaximize", this.handlerNotMaximize);
  }

  /**
   * @description: 移除监听器
   */
  remove() {
    if (!this.win) return;
    this.win.removeListener("maximize", this.handlerMaximize);
    this.win.removeListener("unmaximize", this.handlerNotMaximize);
  }
}

/**
 * @description: 监听窗口全屏改变
 */
class WindowChangeFullScreenListener {
  win: Electron.BrowserWindow | null;
  handlerFullScreen: () => void;
  handlerNotFullScreen: () => void;

  constructor(
    event: Electron.IpcMainEvent,
    callback: ListenerCallback,
    options: ListenerOptions
  ) {
    this.win = BrowserWindow.fromWebContents(event.sender);
    this.handlerNotFullScreen = () => {
      callback(true);
    };
    this.handlerFullScreen = () => {
      callback(false);
    };
    if (!this.win) return;
    if (options?.immediate) callback(this.win.isFullScreen());
    this.win.on("enter-full-screen", this.handlerFullScreen);
    this.win.on("leave-full-screen", this.handlerNotFullScreen);
  }

  /**
   * @description: 移除监听器
   */
  remove() {
    if (!this.win) return;
    this.win.removeListener("enter-full-screen", this.handlerFullScreen);
    this.win.removeListener("leave-full-screen", this.handlerNotFullScreen);
  }
}

const listenerList = {
  windowChangeMaximize: WindowChangeMaximizeListener,
  WindowChangeFullScreen: WindowChangeFullScreenListener,
} as Record<string, any>;

/**
 * @description: 监听器 hook
 */
export function useListener() {
  ipcMain.on("listener", (event, data: ListenerIPCPostMessage) => {
    if (!listenerList[data.name]) {
      console.error(`不存在的监听事件：${data.name}`);
      return;
    }
    const channel = event.ports[0];
    const listener = new listenerList[data.name](
      event,
      channel.postMessage.bind(channel),
      data.options
    );
    channel.on("message", ({ data }) => {
      if ((data.type = "remove")) {
        channel.close();
        listener.remove();
      }
    });
    channel.start();
  });
}
