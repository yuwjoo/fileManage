<template>
  <!-- 筛选项 start -->
  <el-form class="home_form" :model="search" label-suffix=":">
    <el-row class="home_form_row" :gutter="20">
      <el-col :span="6">
        <el-form-item label="关键字">
          <el-input
            v-model="search.searchContent"
            placeholder="请输入模糊搜索"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item>
          <el-button type="primary" icon="Search" plain @click="handleSearch"
            >查询数据</el-button
          >
        </el-form-item>
      </el-col>
      <el-col :span="9">
        <el-form-item>
          <el-button type="success" icon="Plus" plain @click="handleAdd"
            >新建资源</el-button
          >
          <el-button
            type="danger"
            icon="Delete"
            plain
            @click="handleBatchDelete"
            >批量删除</el-button
          >
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <!-- 筛选项 end -->

  <!-- tab栏 start -->
  <el-tabs v-model="active" type="border-card" @tab-change="handleChangeTab">
    <el-tab-pane
      v-for="(item, index) in select.types.list"
      :key="item.id"
      :label="item.title"
      :name="index"
      stretch
      lazy
    >
      <data-table ref="tableRefs" :search="search" />
    </el-tab-pane>
  </el-tabs>
  <!-- tab栏 end -->

  <!-- 新建资源对话框 start -->
  <add-dialog ref="addDialogRef" />
  <!-- 新建资源对话框 end -->
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import dataTable from "./components/dataTable.vue";
import addDialog from "./components/addDialog.vue";
import { useSelect } from "./hooks/select";
import { TabPaneName } from "element-plus";

interface Search {
  searchContent: string;
  tags: number[];
  typeId: number | "";
}

defineOptions({ name: "Home" });

const select = useSelect(); // 下拉列表
const search = reactive<Search>({
  searchContent: "", // 模糊搜索值
  tags: [], // 标签
  typeId: "", // 类型id
});
const active = ref<number>(0); // 当前激活的tab下标
const tableRefs = ref<any[]>([]); // 表格refs
const addDialogRef = ref<any>(null); // 新建对话框ref

/**
 * @description: 处理查询
 */
function handleSearch(): void {
  tableRefs.value[active.value].getData();
}

/**
 * @description: 处理新建
 */
function handleAdd(): void {
  addDialogRef.value.open();
}

/**
 * @description: 处理批量删除
 */
function handleBatchDelete(): void {}

/**
 * @description: 处理tab切换
 * @param {number} index 选中下标
 */
function handleChangeTab(index: TabPaneName): void {
  // search.typeId = select.types.list[index].id;
  // tableRefs.value[index]?.getData();
}
</script>

<style lang="scss">
.home {
  padding: 20px;

  .home_form {
    .home_form_row {
      .el-col:last-child {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
}
</style>
