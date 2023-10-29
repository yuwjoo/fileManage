<template>
  <div class="home">
    <!-- 头部 start -->
    <el-row class="home_header">
      <el-col class="home_header_system" :span="6" :offset="18">
        <el-icon><Minus /></el-icon>
        <el-icon><FullScreen /></el-icon>
        <el-icon><Close /></el-icon>
      </el-col>
    </el-row>
    <!-- 头部 end -->

    <!-- 筛选条件 start -->
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="">
        <el-input
          v-model="form.searchContent"
          placeholder="请输入模糊搜索值"
          clearable
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 筛选条件 end -->

    <!-- tab栏 start -->
    <el-tabs v-model="typeValue" type="border-card">
      <el-tab-pane
        v-for="item in typeList"
        :key="item.id"
        :label="item.title"
        :name="item.directory"
      >
        <el-table :data="tableData" border>
          <el-table-column
            prop="title"
            label="标题"
            min-width="100"
            align="center"
          />
          <el-table-column
            prop="describe"
            label="描述"
            min-width="150"
            align="center"
          />
          <el-table-column
            prop="tags"
            label="标签"
            min-width="100"
            align="center"
          />
          <el-table-column
            prop="option"
            label="操作"
            width="180"
            align="center"
          >
            <el-button type="warning" size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          style="margin-top: 20px"
        />
      </el-tab-pane>
    </el-tabs>
    <!-- tab栏 end -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

interface Form {
  searchContent: String;
}

interface TypeItem {
  id: Number;
  directory: String;
  title: String;
}

interface Page {
  current: Number;
  size: Number;
  total: Number;
}

const form = reactive<Form>({
  searchContent: "", // 模糊搜索值
}); // 表单数据
const tableData = Array.from({ length: 10 }).map(() => ({
  title: "图吧工具箱",
  describe: "这是描述。。。。。",
  tags: "",
})); // 表格数据
const page = reactive<Page>({
  current: 1,
  size: 10,
  total: 100,
}); // 分页
const typeValue = ref<String>("all"); // 当前类型值
const typeList = ref<Array<TypeItem>>([]); // 类型列表

/**
 * @description: 处理查询
 */
function handleSearch() {
  console.log("查询");
}

/**
 * @description: 获取类型列表
 */
function getTypeList() {
  typeList.value = [
    { id: 1, directory: "all", title: "全部" },
    { id: 2, directory: "utils", title: "工具" },
    { id: 3, directory: "book", title: "博客" },
    { id: 4, directory: "self", title: "个人" },
  ];
}

getTypeList();
</script>

<style lang="scss">
.home {
  padding: 0 20px 20px;

  .home_header {
    -webkit-app-region: drag;

    .home_header_system {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .el-icon {
        -webkit-app-region: no-drag;
        padding: 10px 20px;

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);

          &:last-child {
            background-color: rgba(255, 0, 0, 1);
            color: white;
          }
        }
      }
    }
  }
}
</style>
