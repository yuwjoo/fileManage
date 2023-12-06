import type editResourceDialog from '../components/editResourceDialog.vue';
import { ref } from 'vue';
import type { UseEditCategoryDialogTableReturn } from '../types/editCategoryDialogTable';
import type { UseWarehouseSelectReturn } from '../types/warehouseSelect';

export const editCategoryDialogRef = ref<InstanceType<typeof editResourceDialog>>(); // 当前编辑分类对话框ref

/**
 * @description: 编辑分类对话框
 */
export function useEditCategoryDialog() {
  const visible = ref<boolean>(false); // 显示对话框
  /**
   * @description: 打开对话框
   * @param {Pick<UseEditCategoryDialogTableReturn, 'setTableData'>} useEditCategoryDialogTable 编辑分类对话框-表格hook
   * @param {UseWarehouseSelectReturn["category"]} category 分类数据
   */
  function handleOpen(
    useEditCategoryDialogTable: Pick<UseEditCategoryDialogTableReturn, 'setTableData'>,
    category: UseWarehouseSelectReturn['category']
  ) {
    useEditCategoryDialogTable.setTableData(category);
    visible.value = true;
  }

  /**
   * @description: 关闭对话框
   * @param {(evt: 'change') => void} emits 事件
   */
  function handleClose(emits: (evt: 'change') => void) {
    emits('change');
    visible.value = false;
  }

  return { visible, handleOpen, handleClose };
}
