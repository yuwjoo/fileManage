import { ref } from 'vue';
import type { UseCreateCategoryDialogFormReturn } from '../types/createCategoryDialogForm';

/**
 * @description: 创建分类对话框
 */
export function useCreateCategoryDialog() {
  const visible = ref<boolean>(false); // 显示对话框
  /**
   * @description: 打开对话框
   * @param {Pick<UseCreateCategoryDialogFormReturn, 'handleResetForm'>} useCreateCategoryDialogForm 创建分类对话框-表单hook
   */
  function handleOpen(
    useCreateCategoryDialogForm: Pick<UseCreateCategoryDialogFormReturn, 'handleResetForm'>
  ) {
    useCreateCategoryDialogForm.handleResetForm();
    visible.value = true;
  }

  /**
   * @description: 关闭对话框
   */
  function handleClose() {
    visible.value = false;
  }

  return { visible, handleOpen, handleClose };
}
