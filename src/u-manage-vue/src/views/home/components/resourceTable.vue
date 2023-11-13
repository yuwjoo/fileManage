<template>
  <el-row class="resource_table_row" :gutter="20">
    <el-col :span="8">
      <el-input v-model="search.searchContent" placeholder="请输入关键字" clearable />
    </el-col>
    <el-col :span="16">
      <el-button type="primary" :icon="Refresh" plain @click="getData">刷新列表</el-button>
      <el-button type="danger" :icon="Delete" plain @click="handleBatchDelete()"
        >批量删除</el-button
      >
    </el-col>
  </el-row>
  <el-table
    class="resource_table_table"
    :data="tableData"
    border
    stripe
    height="100%"
    @selection-change="multipleSelection = $event"
  >
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column prop="title" label="名称" min-width="100" align="center" />
    <el-table-column prop="describe" label="描述" min-width="150" align="center" />
    <el-table-column prop="tags" label="标签" min-width="100" align="center" />
    <el-table-column prop="option" label="操作" width="140" align="center">
      <template #default="scope">
        <el-button
          type="primary"
          :icon="FolderOpened"
          circle
          title="打开目录"
          @click="handleOpen(scope.row)"
        />
        <el-button type="warning" :icon="Edit" circle title="编辑" @click="handleEdit(scope.row)" />
        <el-button
          type="danger"
          :icon="Delete"
          circle
          title="删除"
          @click="handleDelete(scope.row)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { Delete, Edit, Refresh, FolderOpened } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';

defineOptions({ name: 'resourceTable' });
defineProps({
  // 分类id
  categoryId: {
    type: Number,
    required: true
  }
});

const search = reactive({
  categoryId: -1, // 分类id
  searchContent: '' // 模糊查询值
});
const tableData = ref<any[]>([]); // 表格数据
const multipleSelection = ref<any[]>([]); // 当前选中的数据

/**
 * @description: 获取数据
 */
function getData() {
  tableData.value = [
    {
      tags: '2016-05-03',
      title: 'Tom',
      describe: 'No. 189, Grove St, Los Angeles'
    },
    {
      tags: '2016-05-02',
      title: 'Tom',
      describe: 'No. 189, Grove St, Los Angeles'
    },
    {
      tags: '2016-05-04',
      title: 'Tom',
      describe: 'No. 189, Grove St, Los Angeles'
    },
    {
      tags: '2016-05-01',
      title: 'Tom',
      describe: 'No. 189, Grove St, Los Angeles'
    }
  ];
}

/**
 * @description: 处理批量删除
 */
function handleBatchDelete() {
  console.log(multipleSelection.value);
}

/**
 * @description: 处理打开目录
 * @param {any} row 当前数据
 */
function handleOpen(row: any) {
  console.log(row);
}

/**
 * @description: 处理删除
 * @param {any} row 当前数据
 */
function handleDelete(row: any) {
  console.log(row);
}

/**
 * @description: 处理编辑
 * @param {any} row 当前数据
 */
function handleEdit(row: any) {
  console.log(row);
}

getData();

defineExpose({
  getData
});
</script>

<style lang="scss">
.resource_table_row {
  margin-bottom: 15px;
}
</style>
