<template>
  <div class="layout">
    <nav-menu-bar class="layout_nav" />
    <div class="layout_main"></div>
  </div>
</template>

<script>
import navMenuBar from "./components/navMenuBar";

export default {
  name: "layout",
  components: {
    navMenuBar,
  },
};
</script>

<style lang="scss" scoped>
.layout {
}
</style>
