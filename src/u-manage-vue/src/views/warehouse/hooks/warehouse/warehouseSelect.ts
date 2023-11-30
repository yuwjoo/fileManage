import { reactive } from 'vue';
import { selectCategoryList } from '@/api/warehouse';
import type { Select } from '@/types/views/warehouse/warehouseSelect';

/**
 * @description: 下拉列表
 */
export function useWarehouseSelect() {
  const select = reactive<Select>({
    category: {
      list: [],
      loading: false,
      option: { label: 'name', value: 'id' }
    } // 分类下拉属性
  });

  /**
   * @description: 获取分类列表数据
   */
  function getCategoryList() {
    select.category.loading = true;
    selectCategoryList()
      .then((res) => {
        select.category.list = res || [];
      })
      .catch(() => {
        select.category.list = [];
      })
      .finally(() => {
        select.category.loading = false;
      });
  }

  return { select, getCategoryList };
}
