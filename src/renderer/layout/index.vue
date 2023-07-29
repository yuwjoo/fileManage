<template>
  <div class="layout">
    <!-- 页面布局 start -->
    <el-container class="layout_container" direction="vertical">
      <template v-if="$route.meta.navbar !== 'custom'">
        <navbar-menupage
          v-if="$route.meta.menupage"
          @add="() => $refs.page.$emit('add')"
        />
        <navbar-subpage v-else />
      </template>
      <el-main class="layout_container_main">
        <router-view ref="page" />
      </el-main>
    </el-container>
    <!-- 页面布局 end -->

    <!-- 回到顶部 start -->
    <el-backtop>
      <icon-font icon="el-icon-caret-top" />
    </el-backtop>
    <!-- 回到顶部 end -->
  </div>
</template>

<script>
export default {
  name: "layout",
  components: {
    navbarMenupage: () => import("./components/navbarMenupage"),
    navbarSubpage: () => import("./components/navbarSubpage"),
  },
};
</script>

<style lang="scss" scoped>
.layout {
  .layout_container {
    .layout_container_main {
      padding: 10px;
    }
  }
}
</style>
