<template>
  <el-table v-loading="loading" :data="list" border>
    <el-table-column prop="title" label="标题" min-width="100" align="center" />
    <el-table-column
      prop="describe"
      label="描述"
      min-width="150"
      align="center"
    />
    <el-table-column prop="tags" label="标签" min-width="100" align="center" />
    <el-table-column prop="option" label="操作" width="180" align="center">
      <el-button type="warning" size="small">编辑</el-button>
      <el-button type="danger" size="small">删除</el-button>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getResourceList } from "@/api/home";

defineOptions({ name: "DataTable" });

const { search } = defineProps({
  // 筛选条件
  search: {
    type: Object,
    required: true,
  },
});

const list = ref<any[]>([]); // 列表数据
const loading = ref<boolean>(false); // 加载中

/**
 * @description: 获取数据
 */
function getData() {
  console.log("加载数据", search.typeId);
  loading.value = true;
  getResourceList(search)
    .then(() => {
      // list.value = res.value;
    })
    .finally(() => {
      loading.value = false;
    });
}

onMounted(() => {
  getData();
});

defineExpose({
  getData,
});
</script>
