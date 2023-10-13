<!--
 * @FileName: layout.headerBar
 * @FilePath: \fileManage\src\renderer\layout\components\headerBar\index.vue
 * @Author: YH
 * @Date: 2023-07-20 10:41:01
 * @LastEditors: YH
 * @LastEditTime: 2023-10-13 14:11:25
 * @Description: 布局-头部栏
-->
<template>
  <div class="headerBar">
    <icon-font
      class="headerBar_back"
      v-if="$route.meta.matched.length > 1"
      icon="el-icon-back"
      size="20px"
      @click.native="$router.back()"
    />
    <el-breadcrumb class="headerBar_breadcrumb" separator="/">
      <el-breadcrumb-item
        v-for="(route, index) in $route.meta.matched"
        :key="index"
        >{{ route.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "headerBar",
};
</script>

<style lang="scss" scoped>
.headerBar {
  -webkit-app-region: drag;
  user-select: none;
  height: var(--header-bar-height);
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;

  .headerBar_back {
    -webkit-app-region: no-drag;
    height: 100%;
    line-height: var(--header-bar-height);
    padding-right: 20px;
    cursor: pointer;
  }

  .headerBar_breadcrumb {
    font-size: var(--font-size-base);

    :deep(.el-breadcrumb__item) {
      .el-breadcrumb__inner {
        color: var(--font-color-dark);
      }
    }
  }
}
</style>
