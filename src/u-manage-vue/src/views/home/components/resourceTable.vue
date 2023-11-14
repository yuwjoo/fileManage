<template>
  <!-- <el-row class="resource_table_row" :gutter="20">
    <el-col :span="8">
      <el-input v-model="search.searchContent" placeholder="请输入关键字" clearable />
    </el-col>
    <el-col :span="16">
      <el-button type="primary" :icon="Refresh" plain @click="getData">刷新列表</el-button>
      <el-button type="danger" :icon="Delete" plain @click="handleBatchDelete()"
        >批量删除</el-button
      >
    </el-col>
  </el-row> -->
  <el-page-header icon="">
    <template #title>
      <el-tooltip content="点击刷新列表">全部</el-tooltip>
    </template>
    <template #content>
      <el-input
        v-model="search.searchContent"
        placeholder="请输入关键字搜索"
        size="default"
        clearable
        style="width: 400px"
      />
    </template>
    <template #extra>
      <el-popover v-model:visible="visiblePopover" placement="bottom" :width="400" trigger="click">
        <template #reference>
          <span>
            <el-tooltip content="筛选" :disabled="visiblePopover">
              <el-icon>
                <i-el-filter />
              </el-icon>
            </el-tooltip>
          </span>
        </template>
        <template #default>
          <el-form label-suffix=":">
            <el-form-item label="当前分类">
              <el-radio-group v-model="search.categoryId">
                <el-radio-button label="全部" />
                <el-radio-button label="工具" />
                <el-radio-button label="文档" />
                <el-radio-button label="其他" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="search.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :editable="false"
                :teleported="false"
              />
            </el-form-item>
          </el-form>
          <div style="text-align: right">
            <el-button type="default" @click="visiblePopover = false">重置</el-button>
            <el-button type="primary" @click="visiblePopover = false">查询</el-button>
          </div>
        </template>
      </el-popover>
      <el-divider direction="vertical" style="vertical-align: baseline; margin: 0 16px" />
      <el-tooltip content="切换表格">
        <el-icon><i-el-scale-to-original /></el-icon>
      </el-tooltip>
    </template>
    <!-- <el-divider content-position="left">全部</el-divider> -->
    <el-table
      v-loading="loading"
      class="resource_table_table"
      :data="tableData"
      border
      stripe
      height="100%"
      style="margin-top: 15px"
      @selection-change="multipleSelection = $event"
    >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
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
          <el-button
            type="warning"
            :icon="Edit"
            circle
            title="编辑"
            @click="handleEdit(scope.row)"
          />
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
  </el-page-header>
</template>

<script setup lang="ts">
import { Delete, Edit, Refresh, FolderOpened } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import { selectResourceList } from '@/api/home';
import { toRaw } from 'vue';

defineOptions({ name: 'resourceTable' });
defineProps({
  // 分类id
  categoryId: {
    type: Number,
    required: false
  }
});

const search = reactive({
  date: ['', ''],
  categoryId: -1, // 分类id
  searchContent: '' // 模糊查询值
});
const loading = ref<boolean>(false); // 加载中
const tableData = ref<any[]>([]); // 表格数据
const multipleSelection = ref<any[]>([]); // 当前选中的数据
const visiblePopover = ref<boolean>(false); // 显示弹出层

/**
 * @description: 获取数据
 */
function getData() {
  loading.value = true;
  selectResourceList(toRaw(search))
    .then((res) => {
      console.log(res);
      tableData.value = res || [];
    })
    .finally(() => {
      loading.value = false;
    });
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
