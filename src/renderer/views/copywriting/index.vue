<!--
 * @FileName: views.copywriting
 * @FilePath: \fileManage\src\renderer\views\copywriting\index.vue
 * @Author: YH
 * @Date: 2023-10-10 15:05:18
 * @LastEditors: YH
 * @LastEditTime: 2023-10-13 15:46:26
 * @Description: 文案模块
-->
<template>
  <div class="copywriting">
    <div class="copywriting_search">
      <el-input
        class="copywriting_search_input com-el-input"
        v-model="searchContent"
        prefix-icon="el-icon-search"
        placeholder="请输入搜索内容"
      />
      <el-button class="copywriting_search_search com-el-button" type="primary"
        >查询</el-button
      >
    </div>
    <div class="copywriting_content">
      <div
        class="copywriting_content_card com-card"
        v-for="(item, index) in 10"
        :key="index"
        @click="$router.push({ name: 'ai' })"
      >
        内容
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "copywriting",
  data() {
    return {
      searchContent: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.copywriting {
  .copywriting_search {
    display: flex;
    margin-bottom: 20px;

    .copywriting_search_input {
      width: 400px;
    }

    .copywriting_search_search {
      margin-left: 10px;
    }
  }

  .copywriting_content {
    display: flex;
    flex-wrap: wrap;
    height: 200vh;

    .copywriting_content_card {
      width: calc(100% / 4 - 20px);
      padding: 30px 0;
      text-align: center;
      margin: 0 10px 10px;
      transition: all var(--transition-duration-fast);

      &:hover {
        background-color: var(--primary-color);
        color: var(--font-color-light);
        border-color: var(--primary-color);
      }
    }
  }
}
</style>
