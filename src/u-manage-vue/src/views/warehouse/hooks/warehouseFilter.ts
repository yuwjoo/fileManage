import type { Search } from '@/types/views/warehouse/hooks/warehouseTable';
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
  function filterReset() {
    search.value = {
      searchContent: search.value.searchContent,
      categoryId: undefined,
      createDate: undefined
    };
  }

  /**
   * @description: 过滤器关闭
   */
  function filterClose() {
    visibleFilter.value = false;
  }

  return { visibleFilter, filterReset, filterClose };
}
