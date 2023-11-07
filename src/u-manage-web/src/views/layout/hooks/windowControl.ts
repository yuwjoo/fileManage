import { ref } from "vue";
import { useElectron } from "@/hooks/electron";

const electron = useElectron();
const isMaximize = ref<Boolean>(false); // 窗口是否最大化

/**
 * @description: 处理窗口变化
 * @param {boolean} is 是否最大化
 */
function handleResize(is: boolean): void {
  isMaximize.value = is;
}

/**
 * @description: 处理执行指令
 * @param {string} command 指令
 */
function handleExec(command: string): void {
  electron.request(`window:${command}`);
}

/**
 * @description: 处理刷新页面
 */
function handleReload(): void {
  window.location.reload();
}

/**
 * @description: 窗口控制 hook 入口
 * @return {*}
 */
export function useWindowControl() {
  const isEnable = electron.isElectronEnv;
  if (isEnable) {
    electron.listener("window:changeMaximize", handleResize, {
      immediate: true,
    }); // 监听窗口变化
  }
  return {
    isEnable,
    isMaximize,
    handleExec,
    handleReload,
  };
}
