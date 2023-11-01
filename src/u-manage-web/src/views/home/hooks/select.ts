import { reactive } from "vue";
import { getTypesList } from "@/api/home";

interface SelectItem {
  list: any[];
  loading: Boolean;
}

export const types = reactive<SelectItem>({
  list: [], // 列表数据
  loading: false, // 加载状态
}); // 类型列表

export const tag = reactive<SelectItem>({
  list: [], // 列表数据
  loading: false, // 加载状态
}); // 标签列表

/**
 * @description: 获取类型列表
 */
function getTypesData(): void {
  types.loading = true;
  getTypesList({})
    .then((res) => {
      types.list =
        [
          { id: "", value: "全部" },
          { id: 1, title: "测试" },
          { id: 2, title: "工具" },
        ] ||
        res.value ||
        [];
    })
    .finally(() => {
      types.loading = false;
    });
}

/**
 * @description: 获取标签列表
 */
function getTagList(): void {
  tag.loading = true;
  getTypesList({})
    .then((res) => {
      tag.list =
        [
          { label: "全部", value: "" },
          { label: "测试", value: "1" },
          { label: "工具", value: "2" },
        ] ||
        res.value ||
        [];
    })
    .finally(() => {
      tag.loading = false;
    });
}

getTypesData();
getTagList();
