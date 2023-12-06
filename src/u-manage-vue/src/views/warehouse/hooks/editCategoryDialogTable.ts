import { ref, nextTick } from 'vue';
import { saveCategoryData, deleteCategoryData } from '@/api/warehouse';
import { type FormInstance, type TableInstance } from 'element-plus';
import type { FormRule, TableData } from '../types/editCategoryDialogTable';
import type { UseWarehouseSelectReturn } from '../types/warehouseSelect';

/**
 * @description: 编辑分类对话框-表格数据
 */
export function useEditCategoryDialogTable() {
  const tableData = ref<TableData[]>([]); // 表格数据
  const loading = ref<boolean>(false); // 加载中
  const rules = {
    name: [{ required: true, message: '请输入分类名', trigger: 'change' }],
    directory: [{ required: true, message: '请输入目录', trigger: 'change' }]
  } as FormRule; // 表单校验规则
  const formRef = ref<FormInstance>(); // 表单 ref
  const tableRef = ref<TableInstance>(); // 表格 ref

  /**
   * @description: 设置表格数据
   * @param {UseWarehouseSelectReturn["category"]} category 分类数据
   */
  function setTableData(category: UseWarehouseSelectReturn['category']) {
    tableData.value = category.list.map((item) => {
      return { ...item, status: { isEdit: false, loading: 'no' } };
    });
  }

  /**
   * @description: 处理新建
   */
  function handleAddRow() {
    tableData.value.push({
      status: {
        isEdit: true,
        loading: 'no'
      }
    });
    nextTick(() => tableRef.value!.setScrollTop(9999));
  }

  /**
   * @description: 处理保存
   * @param {TableData} row 当前数据
   * @param {number} index 数据下标
   */
  async function handleSaveRow(row: TableData, index: number) {
    const isValid = await formRef.value?.validateField([`[${index}].name`, `[${index}].directory`]);
    if (isValid) {
      row.status.loading = 'save';
      try {
        const res = await saveCategoryData({
          id: row.id,
          name: row.name,
          directory: row.directory
        });
        row.id = res.data;
        row.status.isEdit = false;
        ElNotification({
          type: 'success',
          title: '',
          message: '保存成功',
          position: 'bottom-right'
        });
      } catch (err) {
        /* empty */
      }
      row.status.loading = 'no';
    }
  }

  /**
   * @description: 处理删除
   * @param {TableData} row 当前数据
   * @param {number} index 数据下标
   */
  async function handleDeleteRow(row: TableData, index: number) {
    const action = () => {
      tableData.value.splice(index, 1);
      ElNotification({
        type: 'success',
        title: '',
        message: '删除成功',
        position: 'bottom-right'
      });
    };
    if (row.id) {
      row.status.loading = 'delete';
      try {
        await deleteCategoryData({ id: row.id });
        action();
      } catch (err) {
        row.status.loading = 'no';
      }
    } else {
      action();
    }
  }

  /**
   * @description: 处理编辑
   * @param {TableData} row 当前数据
   */
  function handleEditRow(row: TableData) {
    row.status.isEdit = true;
  }

  return {
    tableData,
    loading,
    rules,
    formRef,
    tableRef,
    setTableData,
    handleAddRow,
    handleSaveRow,
    handleDeleteRow,
    handleEditRow
  };
}
