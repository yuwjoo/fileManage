<!--
 * @FileName: layout.headerBar
 * @FilePath: \fileManage\src\renderer\layout\components\headerBar\index.vue
 * @Author: YH
 * @Date: 2023-07-20 10:41:01
 * @LastEditors: YH
 * @LastEditTime: 2023-10-10 14:57:27
 * @Description: 布局-头部栏
-->
<template>
  <div class="headerBar"></div>
</template>

<script>
export default {
  name: "headerBar",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.headerBar {
  -webkit-app-region: drag;
  user-select: none;
  height: var(--header-bar-height);
}
</style>
