import { ref, reactive } from "vue";
import type { Ref } from "vue";
import { getResourceList } from "@/api/home";

interface Page {
  current: Number; // 当前页
  size: Number; // 每页条数
  total: Number; // 总数
}

interface UseTable {
  list: Ref<any[]>;
  page: Page;
  loading: Ref<Boolean>;
  getData: Function;
  resetData: Function;
}

const page = reactive<Page>({
  current: 1,
  size: 10,
  total: 0,
}); // 分页
const list = ref<any[]>([]); // 数据
const loading = ref<Boolean>(false); // 加载状态

/**
 * @description: 获取数据
 * @param {object} params 参数
 */
function getData(params: object): void {
  loading.value = true;
  getResourceList({ ...params, ...page })
    .then((res) => {
      list.value = res.value;
    })
    .finally(() => {
      loading.value = false;
    });
}

/**
 * @description: 重新设置数据
 * @param {object} params 参数
 */
function resetData(params: object): void {
  page.current = 1;
  page.total = 0;
  getData(params);
}

/**
 * @description: 获取表格数据
 * @return {UseTable} 表格数据
 */
export function useTable(): UseTable {
  return {
    list,
    page,
    loading,
    getData,
    resetData,
  };
}
