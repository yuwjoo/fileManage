import { ref, nextTick } from 'vue';
import { selectCategoryList, saveCategoryData, deleteCategoryData } from '@/api/warehouse';
import { ElNotification, type FormInstance, type TableInstance } from 'element-plus';
import type { FormRule, ListData } from '@/types/views/warehouse/editCategoryDialogTable';

/**
 * @description: 编辑分类对话框-表格数据
 */
export function useEditCategoryDialogTable() {
  const list = ref<ListData[]>([]); // 列表数据
  const loading = ref<boolean>(false); // 加载中
  const rules = {
    name: [{ required: true, message: '请输入分类名', trigger: 'change' }],
    directory: [{ required: true, message: '请输入目录', trigger: 'change' }]
  } as FormRule; // 表单校验规则
  const formRef = ref<FormInstance>(); // 表单 ref
  const tableRef = ref<TableInstance>(); // 表格 ref

  /**
   * @description: 获取数据
   */
  function getData() {
    loading.value = true;
    selectCategoryList()
      .then((res) => {
        list.value = (res || []).map((item) => {
          return { ...item, status: { isEdit: false, loading: 'no' } };
        });
      })
      .catch(() => {
        list.value = [];
      })
      .finally(() => {
        loading.value = false;
      });
  }

  /**
   * @description: 处理新建
   */
  function handleAddRow() {
    list.value.push({
      status: {
        isEdit: false,
        loading: 'no'
      }
    });
    nextTick(() => tableRef.value!.setScrollTop(9999));
  }

  /**
   * @description: 处理保存
   * @param {ListData} row 当前数据
   * @param {number} index 数据下标
   */
  function handleSaveRow(row: ListData, index: number) {
    formRef.value?.validateField([`[${index}].name`, `[${index}].directory`], (valid) => {
      if (valid) {
        row.status.loading = 'save';
        saveCategoryData({ id: row.id, name: row.name, directory: row.directory })
          .then(() => {
            ElNotification({
              type: 'success',
              title: '',
              message: '保存成功',
              position: 'bottom-right'
            });
            row.status.isEdit = false;
          })
          .finally(() => {
            row.status.loading = 'no';
          });
      }
    });
  }

  /**
   * @description: 处理删除
   * @param {ListData} row 当前数据
   * @param {number} index 数据下标
   */
  function handleDeleteRow(row: ListData, index: number) {
    const handler = () => {
      ElNotification({
        type: 'success',
        title: '',
        message: '删除成功',
        position: 'bottom-right'
      });
      list.value.splice(index, 1);
    };
    if (row.id) {
      row.status.loading = 'delete';
      deleteCategoryData({ id: row.id })
        .then(() => handler())
        .catch(() => {
          row.status.loading = 'no';
        });
    } else {
      handler();
    }
  }

  /**
   * @description: 处理编辑
   * @param {ListData} row 当前数据
   */
  function handleEditRow(row: ListData) {
    row.status.isEdit = true;
  }

  return {
    list,
    loading,
    rules,
    formRef,
    tableRef,
    getData,
    handleAddRow,
    handleSaveRow,
    handleDeleteRow,
    handleEditRow
  };
}
