import type editResourceDialog from '../components/editResourceDialog.vue';
import { ref } from 'vue';
import type { UseEditResourceDialogFormReturn } from '../types/editResourceDialogForm';

export const editResourceDialogRef = ref<InstanceType<typeof editResourceDialog>>(); // 当前编辑资源对话框ref

/**
 * @description: 编辑资源对话框
 */
export function useEditResourceDialog() {
  const visible = ref<boolean>(false); // 显示对话框
  /**
   * @description: 打开对话框
   * @param {Pick<UseEditResourceDialogFormReturn, 'handleResetForm'>} useEditResourceDialogForm 编辑资源对话框-表单hook
   */
  function handleOpen(
    useEditResourceDialogForm: Pick<UseEditResourceDialogFormReturn, 'handleResetForm'>
  ) {
    useEditResourceDialogForm.handleResetForm();
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
