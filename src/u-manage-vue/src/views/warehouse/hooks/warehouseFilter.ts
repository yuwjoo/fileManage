import { ref } from 'vue';
import type { Search } from '../types/warehouseFilter';
import type { UseWarehouseTableReturn } from '../types/warehouseTable';

/**
 * @description: 仓库-过滤器弹出层
 */
export function useWarehouseFilter() {
  const visibleFilter = ref<boolean>(false); // 显示筛选器弹出层
  const search = ref<Search>({}); // 筛选条件

  /**
   * @description: 过滤器重置
   */
  function handleFilterReset() {
    search.value = {
      ...search.value,
      categoryId: undefined,
      createDate: undefined
    };
  }

  /**
   * @description: 过滤器查询
   * @param {useWarehouseTable} useWarehouseTable 仓库-表格 hook
   */
  function handleFilterSearch(useWarehouseTable: Pick<UseWarehouseTableReturn, 'setTableData'>) {
    handleFilterClose();
    useWarehouseTable.setTableData(search);
  }

  /**
   * @description: 过滤器关闭
   */
  function handleFilterClose() {
    visibleFilter.value = false;
  }

  return { visibleFilter, search, handleFilterReset, handleFilterSearch, handleFilterClose };
}
