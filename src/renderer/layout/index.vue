<!--
 * @FileName: layout
 * @FilePath: \fileManage\src\renderer\layout\index.vue
 * @Author: YH
 * @Date: 2023-08-28 16:58:06
 * @LastEditors: YH
 * @LastEditTime: 2023-10-10 16:40:27
 * @Description: 布局
-->
<template>
  <div class="layout">
    <nav-bar class="layout_nav" />
    <div class="layout_content">
      <header-bar class="layout_content_header" />
      <div class="layout_content_main" id="main">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </div>
    <window-buttons />
  </div>
</template>

<script>
import navBar from "./components/navBar";
import headerBar from "./components/headerBar";
import windowButtons from "./components/windowButtons";

export default {
  name: "layout",
  components: {
    navBar,
    headerBar,
    windowButtons,
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;

  .layout_nav {
    flex-shrink: 0;
  }

  .layout_content {
    height: 100vh;
    flex-grow: 1;

    .layout_content_main {
      overflow-x: hidden;
      overflow-y: auto;
      height: calc(100vh - var(--header-bar-height));
      padding: 10px 20px;
      box-sizing: border-box;
    }
  }
}
</style>
