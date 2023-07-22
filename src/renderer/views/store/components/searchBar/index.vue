<template>
  <div class="searchBar">
    <el-input
      class="searchBar_input"
      v-model="searchText"
      placeholder="请输入关键字，回车键查询"
      @keydown.enter="$emit('search', searchText)"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "", // 模糊搜索关键字
    };
  },
};
</script>

<style lang="scss" scoped>
.searchBar {
  padding: 0 30%;

  .searchBar_input {
    :deep(.el-input__inner) {
      padding: 15px;
      border-radius: 15px;
      font-size: var(--font-size-small);
      border-top-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;

      &::placeholder {
        user-select: none;
      }
    }
  }
}
</style>
