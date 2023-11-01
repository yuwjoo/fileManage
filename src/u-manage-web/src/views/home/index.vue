<template>
  <div class="home">
    <!-- 头部 start -->
    <com-header v-if="isElectronEnv()" />
    <!-- 头部 end -->

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
        <el-col :span="6">
          <el-form-item label="标签">
            <el-select v-model="search.tags" multiple placeholder="请选择标签">
              <el-option></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-button
              type="primary"
              icon="Search"
              plain
              @click="resetData(search)"
              >查询数据</el-button
            >
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item>
            <el-button
              type="success"
              icon="Plus"
              plain
              @click="resetData(search)"
              >新建资源</el-button
            >
            <el-button
              type="danger"
              icon="Delete"
              plain
              @click="resetData(search)"
              >批量删除</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 筛选项 end -->

    <!-- tab栏 start -->
    <el-tabs v-model="search.typeId" type="border-card">
      <el-tab-pane
        v-for="item in types.list"
        :key="item.id"
        :label="item.title"
        :name="item.id"
        :stretch="true"
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
      </el-tab-pane>
    </el-tabs>
    <!-- tab栏 end -->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import comHeader from "@/components/Header.vue";
import { isElectronEnv } from "@/hooks/electron";

interface Search {
  searchContent: string;
  tags: number[];
  typeId: number;
}

defineOptions({
  name: "Home",
});

const search = reactive<Search>({
  searchContent: "", // 模糊搜索值
  tags: [], // 标签
  typeId: -1, // 类型id
});
const list = ref<any[]>([]); // 列表数据
const loading = ref<boolean>(false); // 加载状态
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
