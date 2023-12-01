import type { Search } from '@/types/views/warehouse/warehouseTable';
import { ref, type Ref } from 'vue';

/**
 * @description: 过滤器弹出层
 * @param {Ref<Search>} search 筛选条件
 */
export function useWarehouseFilter(search: Ref<Search>) {
  const visibleFilter = ref<boolean>(false); // 显示筛选器弹出层

  /**
   * @description: 过滤器条件重置
   */
  function handleFilterReset() {
    search.value = {
      ...search.value,
      categoryId: -1,
      createDate: undefined
    };
  }

  /**
   * @description: 过滤器关闭
   */
  function handleFilterClose() {
    visibleFilter.value = false;
  }

  return { visibleFilter, handleFilterReset, handleFilterClose };
}
