<template>
  <div class="home">
    <!-- 头部 start -->
    <com-header />
    <!-- 头部 end -->

    <!-- 筛选条件 start -->
    <el-form :inline="true" :model="search" class="demo-form-inline">
      <el-form-item label="">
        <el-input
          v-model="search.searchContent"
          placeholder="请输入模糊搜索值"
          clearable
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="resetData(search)">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 筛选条件 end -->

    <!-- tab栏 start -->
    <el-tabs v-model="search.typeId" type="border-card">
      <el-tab-pane
        v-for="item in types.list"
        :key="item.id"
        :label="item.title"
        :name="item.id"
      >
        <el-table :data="list" border :loading="loading">
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
          :current-page="page.current"
          :page-size="page.size"
          :page-count="page.total"
          style="margin-top: 20px"
          @update:current-page="handleChangeCurrent"
        />
      </el-tab-pane>
    </el-tabs>
    <!-- tab栏 end -->
  </div>
</template>

<script setup lang="ts">
import comHeader from "@/components/Header.vue";
import { useSearch } from "./hooks/search.ts";
import { useSelect } from "./hooks/select.ts";
import { useTable } from "./hooks/table.ts";

defineOptions({
  name: "Home",
});

const { search } = useSearch();
const { types } = useSelect();
const { list, page, loading, getData, resetData } = useTable();

/**
 * @description: 处理当前页改变
 */
function handleChangeCurrent(): void {
  getData(search);
}
</script>

<style lang="scss">
.home {
  padding: 0 20px 20px;
}
</style>
