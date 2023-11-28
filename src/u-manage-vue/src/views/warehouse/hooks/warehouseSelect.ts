import { reactive } from 'vue';
import { selectCategoryList } from '@/api/warehouse';
import type { Select, SelectItem } from '@/types/views/warehouse/hooks/warehouseSelect';

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
   * @description: 获取名称
   * @param {SelectItem<any[]>} prop 下拉列表属性
   * @param {any} id 数据id
   * @return {string} 数据名称
   */
  function getLabel(prop: SelectItem<any[]>, id: any): string {
    const target = prop.list.find((item) => item[prop.option.value] === id);
    return target?.[prop.option.label] ?? '';
  }

  /**
   * @description: 获取分类列表数据
   */
  function getCategoryList() {
    select.category.loading = true;
    return selectCategoryList()
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

  return { select, getLabel, getCategoryList };
}
