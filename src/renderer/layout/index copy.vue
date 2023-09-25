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
        <keep-alive :include="/^keep-/">
          <router-view ref="page" />
        </keep-alive>
      </el-main>
    </el-container>
    <!-- 页面布局 end -->

    <!-- 回到顶部 start -->
    <el-backtop>
      <icon-font icon="el-icon-caret-top" />
    </el-backtop>
    <!-- 回到顶部 end -->

    <!-- 自定义滚动条 start -->
    <scrollbar />
    <!-- 自定义滚动条 end -->
  </div>
</template>

<script>
import navbarMenupage from "./components/navbarMenupage";
import navbarSubpage from "./components/navbarSubpage";
import scrollbar from "@/components/Scrollbar";

export default {
  name: "layout",
  components: {
    navbarMenupage,
    navbarSubpage,
    scrollbar,
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
