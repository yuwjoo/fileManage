<template>
  <div class="home">
    <!-- <el-form class="home_form" :model="search" label-suffix=":">
      <el-row class="home_form_row" :gutter="20">
        <el-col :span="6">
          <el-form-item label="模糊搜索">
            <el-input v-model="search.searchContent" placeholder="请输入关键字" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item>
            <el-button type="primary" :icon="Refresh" plain @click="handleAdd">刷新列表</el-button>
            <el-button type="success" :icon="Plus" plain @click="handleAdd">新建资源</el-button>
            <el-button type="danger" :icon="Delete" plain @click="handleBatchDelete"
              >批量删除</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form> -->
    <el-table :data="tableData" border stripe>
      <el-table-column prop="title" label="分类" min-width="50" align="center" />
      <el-table-column prop="title" label="名称" min-width="100" align="center" />
      <el-table-column prop="describe" label="描述" min-width="150" align="center" />
      <el-table-column prop="tags" label="标签" min-width="100" align="center" />
      <el-table-column prop="option" label="操作" width="140" align="center">
        <el-button type="primary" :icon="FolderOpened" circle title="打开目录" />
        <el-button type="warning" :icon="Edit" circle title="编辑" />
        <el-button type="danger" :icon="Delete" circle title="删除" />
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { Collection, Plus, Delete, Edit, Refresh, FolderOpened } from '@element-plus/icons-vue';
import { reactive } from 'vue';

defineOptions({ name: 'home' });

const search = reactive({
  searchContent: ''
});

const tableData = [
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
function handleSearch() {}
function handleAdd() {}
function handleBatchDelete() {}
</script>
