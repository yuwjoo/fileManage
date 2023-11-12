import { computed, ref, type FunctionalComponent, type SVGAttributes, type ComputedRef } from 'vue';
import { useElectron } from '@/hooks/electron';
import iconDevTools from '~icons/iconfont/dev-tools';
import iconRefreshRight from '~icons/ep/refresh-right';
import iconMinimize from '~icons/iconfont/minimize';
import iconRestore from '~icons/iconfont/restore';
import iconMaximize from '~icons/iconfont/maximize';
import iconClose from '~icons/iconfont/close';

interface Buttons {
  icon: FunctionalComponent<SVGAttributes, {}, any>;
  title: string;
  onclick: () => void;
}

let electron: any; // electron api

/**
 * @description: 处理打开控制台
 */
function handleOpenDevTools() {
  electron.request('window:openDevTools');
}

/**
 * @description: 处理打开控制台
 */
function handleMinimize() {
  electron.request('window:minimize');
}

/**
 * @description: 处理重置窗口大小
 */
function handleRestore() {
  electron.request('window:restore');
}

/**
 * @description: 处理最大化窗口
 */
function handleMaximize() {
  electron.request('window:maximize');
}

/**
 * @description: 处理关闭窗口
 */
function handleClose() {
  electron.request('window:close');
}

/**
 * @description: 处理刷新页面
 */
function handleReload() {
  window.location.reload();
}

/**
 * @description: 窗口控制相关 hook
 * @return {ComputedRef<Buttons[]>} 控制按钮列表
 */
export function useWindowControl(): ComputedRef<Buttons[]> {
  electron = useElectron(); // electron api
  const isDevEnv = import.meta.env.DEV; // 是开发环境
  const isMaximize = ref<Boolean>(false); // 是最大化窗口
  const showControl = electron.isElectronEnv; // 显示窗口控制按钮

  /**
   * @description: 监听窗口最大化状态改变
   */
  if (showControl) {
    electron.listener('window:changeMaximize', (is: boolean) => (isMaximize.value = is), {
      immediate: true
    });
  }

  return computed(() => {
    const buttons = <Array<Buttons>>[];
    if (!showControl) return buttons;
    if (isDevEnv) {
      buttons.push(
        { icon: iconDevTools, title: '打开控制台', onclick: handleOpenDevTools },
        { icon: iconRefreshRight, title: '刷新页面', onclick: handleReload }
      );
    }
    buttons.push({ icon: iconMinimize, title: '最小化', onclick: handleMinimize });
    if (isMaximize.value) {
      buttons.push({ icon: iconRestore, title: '还原', onclick: handleRestore });
    } else {
      buttons.push({ icon: iconMaximize, title: '最大化', onclick: handleMaximize });
    }
    buttons.push({ icon: iconClose, title: '关闭', onclick: handleClose });
    return buttons;
  });
}
