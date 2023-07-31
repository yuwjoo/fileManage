<template>
  <div class="searchBar">
    <el-input
      class="searchBar_input"
      v-model="searchText"
      prefix-icon="el-icon-search"
      placeholder="请输入关键字，回车键查询"
      @keydown.enter="$emit('search', searchText)"
    />
  </div>
</template>

<script>
export default {
  name: "searchBar",
  data() {
    return {
      searchText: "", // 模糊搜索关键字
    };
  },
};
</script>

<style lang="scss" scoped>
.searchBar {
  margin: 0 auto;
  width: 40%;
  min-width: 300px;

  .searchBar_input {
    :deep(.el-input__inner) {
      padding: 17px 15px 17px 30px;
      border: none;
      font-size: var(--font-size-base);

      &::placeholder {
        user-select: none;
        font-size: var(--font-size-small);
      }
    }

    :deep(.el-input__prefix .el-input__icon) {
      line-height: 34px;
    }
  }
}
</style>
