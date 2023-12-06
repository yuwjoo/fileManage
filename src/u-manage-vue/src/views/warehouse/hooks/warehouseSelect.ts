import { reactive, readonly } from 'vue';
import { selectCategoryList } from '@/api/warehouse';
import type { CategorySelectProp } from '../types/warehouseSelect';

/**
 * @description: 仓库-下拉列表
 */
export function useWarehouseSelect() {
  const category = reactive<CategorySelectProp>({
    list: [],
    loading: false,
    option: { label: 'name', value: 'id' }
  }); // 分类下拉

  /**
   * @description: 设置分类列表数据
   */
  async function setCategoryList() {
    category.loading = true;
    try {
      const res = await selectCategoryList();
      category.list = res.data || [];
    } catch {
      category.list = [];
    } finally {
      category.loading = false;
    }
  }

  /**
   * @description: 获取分类名
   * @param {any} value 分类值
   * @return {string} 分类名
   */
  function getCategoryName(value: any): string {
    const target = category.list.find((item) => item[category.option.value] === value);
    return target?.name ?? '';
  }

  return { category: readonly(category), setCategoryList, getCategoryName };
}
