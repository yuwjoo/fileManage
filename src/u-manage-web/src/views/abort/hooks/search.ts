import { reactive } from "vue";

interface Search {
  searchContent: String; // 模糊搜索值
  typeId: Number; // 类型id
}

interface UseSearch {
  search: Search;
}

const search = reactive<Search>({
  searchContent: "",
  typeId: -1,
});

/**
 * @description: 获取筛选数据
 * @return {UseSearch} 筛选数据
 */
export function useSearch(): UseSearch {
  return { search };
}
