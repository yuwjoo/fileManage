import { reactive } from "vue";
import { getTypesList } from "@/api/home";

enum SelectKeys {
  types = "types",
  tag = "tag",
}

interface SelectItem {
  list: any[];
  loading: Boolean;
}

type Select = {
  [key in SelectKeys]: SelectItem;
};

const select = reactive<Select>({
  types: {
    list: [],
    loading: false,
  }, // 类型列表
  tag: {
    list: [],
    loading: false,
  }, // 标签列表
});

/**
 * @description: 获取类型列表
 */
function getTypesData(): void {
  select.types.loading = true;
  getTypesList({})
    .then((res) => {
      select.types.list =
        [
          { id: "", title: "全部" },
          { id: 1, title: "测试" },
          { id: 2, title: "工具" },
        ] ||
        res.value ||
        [];
    })
    .finally(() => {
      select.types.loading = false;
    });
}

/**
 * @description: 获取标签列表
 */
function getTagList(): void {
  select.tag.loading = true;
  getTypesList({})
    .then((res) => {
      select.tag.list =
        [
          { label: "全部", value: "" },
          { label: "测试", value: "1" },
          { label: "工具", value: "2" },
        ] ||
        res.value ||
        [];
    })
    .finally(() => {
      select.tag.loading = false;
    });
}

/**
 * @description: 下拉列表数据
 * @return {Select} 列表对象
 */
export function useSelect(): Select {
  getTypesData();
  getTagList();
  return select;
}
