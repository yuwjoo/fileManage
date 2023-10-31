import { reactive } from "vue";
import { getTypesList } from "@/api/home";

interface SelectItem {
  list: any[]; // 列表数据
  loading: Boolean; // 加载状态
}

interface UseSelect {
  [key: string]: SelectItem;
}

const types = reactive<SelectItem>({
  list: [],
  loading: false,
}); // 类型列表

/**
 * @description: 获取类型列表
 */
function getTypesData(): void {
  types.loading = true;
  getTypesList({})
    .then((res) => {
      // types.list = res.value || [];
    })
    .finally(() => {
      types.loading = false;
    });
}

/**
 * @description: 获取下拉列表数据
 * @return {UseSelect} 下拉数据
 */
export function useSelect(): UseSelect {
  getTypesData();
  return { types };
}
