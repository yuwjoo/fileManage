<template>
  <navbar class="navbarMenu">
    <template #left>
      <icon-font
        class="navbarMenu_button"
        icon="el-icon-back"
        @click="handleClickBack"
      />
    </template>
  </navbar>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  methods: {
    /**
     * @name: 处理点击返回按钮
     */
    handleClickBack() {
      this.$router.back();
    },
  },
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
.navbarMenu {
  .navbarMenu_button {
    -webkit-app-region: no-drag;
    cursor: pointer;
  }
}
</style>
