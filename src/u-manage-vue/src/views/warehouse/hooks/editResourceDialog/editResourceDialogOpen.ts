import { ref } from 'vue';

const openFun = ref<(...arg: any[]) => void>();

/**
 * @description: 编辑资源对话框-打开函数
 */
export function useEditResourceDialogOpen(fun?: (...arg: any[]) => void) {
  if (fun) openFun.value = fun;

  return {
    open: openFun.value
  };
}
