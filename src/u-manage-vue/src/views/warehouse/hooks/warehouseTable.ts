import { computed, readonly, ref, toRaw, type Ref } from 'vue';
import { selectResourceList, deleteResourceData } from '@/api/warehouse';
import { editResourceDialogRef } from '@/views/warehouse/hooks/editResourceDialog';
import type { Resource } from '@/types/api/warehouse';
import type { Query } from '../types/warehouseTable';
import type { Search } from '../types/warehouseFilter';

/**
 * @description: 仓库-表格
 */
export function useWarehouseTable() {
  const query = ref<Query>({}); // 查询条件
  const loading = ref<boolean>(false); // 加载中
  const resourceList = ref<Resource[]>([]); // 资源列表
  const tableData = computed(() => {
    const { searchContent } = query.value;
    return resourceList.value.filter((item) => item.name.includes(searchContent || ''));
  }); // 表格数据

  /**
   * @description: 设置表格数据
   * @param {Ref<Search>} search 筛选条件
   */
  function setTableData(search?: Ref<Search>) {
    if (search) query.value = JSON.parse(JSON.stringify(search.value));
    loading.value = true;
    selectResourceList(toRaw(query.value))
      .then((res) => {
        resourceList.value = res.data || [];
      })
      .catch(() => {
        resourceList.value = [];
      })
      .finally(() => {
        loading.value = false;
      });
  }

  /**
   * @description: 处理打开目录
   * @param {Resource} row 当前数据
   */
  function handleOpenDir(row: Resource) {
    console.log(row);
  }

  /**
   * @description: 处理删除
   * @param {Resource} row 当前数据
   */
  function handleDeleteRow(row: Resource) {
    (row as any).deleteLoading = true;
    deleteResourceData(toRaw(row))
      .then(() => {
        setTableData();
      })
      .finally(() => {
        (row as any).deleteLoading = true;
      });
  }

  /**
   * @description: 处理编辑
   * @param {Resource} row 当前数据
   */
  function handleEditRow(row: Resource) {
    editResourceDialogRef.value?.open(2, row);
  }

  return {
    query: readonly(query),
    loading,
    tableData,
    setTableData,
    handleOpenDir,
    handleDeleteRow,
    handleEditRow
  };
}
