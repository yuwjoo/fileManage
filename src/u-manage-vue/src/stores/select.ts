import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { selectCategoryList } from '@/api/home';

interface SelectData {
  list: { [key: string]: any }[];
  loading: boolean;
  option: { label: string; value: string };
}

export const useSelectStore = defineStore('select', () => {
  const category = reactive<SelectData>({
    list: [],
    loading: false,
    option: { label: 'name', value: 'directory' }
  }); // 分类下拉属性

  /**
   * @description: 获取分类列表数据
   */
  function getCategoryList() {
    category.loading = true;
    selectCategoryList()
      .then((res) => {
        category.list = res || [];
      })
      .catch(() => {
        category.list = [];
      })
      .finally(() => {
        category.loading = false;
      });
  }

  return { category, getCategoryList };
});
