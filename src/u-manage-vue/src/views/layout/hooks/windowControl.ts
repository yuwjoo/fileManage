import { computed, ref, type ComputedRef } from 'vue';
import { useElectron } from '@/hooks/electron';
import iconDevTools from '~icons/iconfont/dev-tools';
import iconRefreshRight from '~icons/ep/refresh-right';
import iconMinimize from '~icons/iconfont/minimize';
import iconRestore from '~icons/iconfont/restore';
import iconMaximize from '~icons/iconfont/maximize';
import iconClose from '~icons/iconfont/close';
import type { WindowControlButtons } from '@/types/views/layout/hooks/windowControl';

/**
 * @description: 窗口控制相关 hook
 * @return {ComputedRef<WindowControlButtons[]>} 控制按钮列表
 */
export function useWindowControl(): ComputedRef<WindowControlButtons[]> {
  const electron = useElectron(); // electron api
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
    const buttons = <Array<WindowControlButtons>>[];
    if (!showControl) return buttons;
    if (isDevEnv) {
      buttons.push(
        {
          icon: iconDevTools,
          title: '打开控制台',
          onclick: () => electron.request('window:openDevTools')
        },
        { icon: iconRefreshRight, title: '刷新页面', onclick: () => window.location.reload() }
      );
    }
    buttons.push({
      icon: iconMinimize,
      title: '最小化',
      onclick: () => electron.request('window:minimize')
    });
    if (isMaximize.value) {
      buttons.push({
        icon: iconRestore,
        title: '还原',
        onclick: () => electron.request('window:restore')
      });
    } else {
      buttons.push({
        icon: iconMaximize,
        title: '最大化',
        onclick: () => electron.request('window:maximize')
      });
    }
    buttons.push({
      icon: iconClose,
      title: '关闭',
      onclick: () => electron.request('window:close')
    });
    return buttons;
  });
}
