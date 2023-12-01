import { computed, ref, toRaw } from 'vue';
import { selectResourceList } from '@/api/warehouse';
import type { Search } from '@/types/views/warehouse/warehouseTable';
import type { ResourceListResponse } from '@/types/api/warehouse';

/**
 * @description: 表格数据
 */
export function useWarehouseTable() {
  const rawlist = ref<ResourceListResponse>([]); // 原始列表数据
  const loading = ref<boolean>(false); // 加载中
  const search = ref<Search>({
    searchContent: '',
    categoryId: -1,
    createDate: undefined
  }); // 筛选条件
  const tableSearch = ref<Search>(JSON.parse(JSON.stringify(search.value))); // 当前表格使用的筛选条件
  const list = computed(() => {
    return rawlist.value.filter((item) => item.name.includes(search.value.searchContent || ''));
  }); // 列表数据

  /**
   * @description: 获取列表数据
   */
  function getList() {
    tableSearch.value = JSON.parse(JSON.stringify(search.value));
    loading.value = true;
    selectResourceList(toRaw(search.value))
      .then((res) => {
        rawlist.value = res || [];
      })
      .catch(() => {
        rawlist.value = [];
      })
      .finally(() => {
        loading.value = false;
      });
  }

  /**
   * @description: 处理打开目录
   * @param {ResourceListResponse[0]} row 当前数据
   */
  function handleOpenDir(row: ResourceListResponse[0]) {
    console.log(row);
  }

  /**
   * @description: 处理删除
   * @param {ResourceListResponse[0]} row 当前数据
   */
  function handleDeleteRow(row: ResourceListResponse[0]) {
    console.log(row);
  }

  /**
   * @description: 处理编辑
   * @param {ResourceListResponse[0]} row 当前数据
   */
  function handleEditRow(row: ResourceListResponse[0]) {
    console.log(row);
  }

  return {
    loading,
    list,
    search,
    tableSearch,
    getList,
    handleOpenDir,
    handleDeleteRow,
    handleEditRow
  };
}
