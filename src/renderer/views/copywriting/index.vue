<!--
 * @FileName: views.copywriting
 * @FilePath: \fileManage\src\renderer\views\copywriting\index.vue
 * @Author: YH
 * @Date: 2023-10-10 15:05:18
 * @LastEditors: YH
 * @LastEditTime: 2023-10-10 17:55:06
 * @Description: 文案模块
-->
<template>
  <div class="copywriting">
    <div class="copywriting_search">
      <el-input
        class="copywriting_search_input com-el-input"
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
      >
        内容
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "copywriting",
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
    justify-content: space-between;

    .copywriting_content_card {
      width: 200px;
      padding: 30px 0;
      text-align: center;
      margin-bottom: 10px;
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
