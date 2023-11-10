import { ref } from 'vue';
import { useElectron } from '@/hooks/electron';

const isMaximize = ref<Boolean>(false); // 窗口是否最大化

/**
 * @description: 处理窗口变化
 * @param {boolean} is 是否最大化
 */
function handleResize(is: boolean): void {
  isMaximize.value = is;
}

/**
 * @description: 窗口控制 hook 入口
 * @return {*}
 */
export function useWindowControl() {
  const electron = useElectron();
  if (!electron?.isElectronEnv) return { isShow: false };

  electron.listener('window:changeMaximize', handleResize, { immediate: true }); // 监听窗口最大化状态改变

  return {
    isShow: electron.isElectronEnv,
    isMaximize,
    max: () => electron.request('window:maximize'),
    min: () => electron.request('window:minimize'),
    restore: () => electron.request('window:restore'),
    close: () => electron.request('window:close'),
    openDevTools: () => electron.request('window:openDevTools'),
    reload: () => window.location.reload()
  };
}
