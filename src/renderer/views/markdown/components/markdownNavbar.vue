<template>
  <navbar class="navbarMenu">
    <template #left>
      <icon-font
        class="navbarMenu_button"
        icon="el-icon-back"
        @click="handleClickBack"
      />
    </template>
    <template #title>
      <el-dropdown
        class="navbarMenu_dropdown"
        trigger="click"
        placement="bottom"
        @command="handleClickDropdown"
      >
        <span class="navbarMenu_dropdown_content"
          >{{ value }} <icon-font icon="el-icon-arrow-down"
        /></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in list"
            :key="index"
            :command="item.name"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </template>
  </navbar>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "markdownNavbar",
  props: {
    value: {
      type: String,
      required: true,
    },
    // 文件列表
    list: {
      type: Array,
      required: true,
    },
  },
  methods: {
    /**
     * @name: 处理点击返回按钮
     */
    handleClickBack() {
      this.$router.back();
    },
    /**
     * @name: 处理点击下拉菜单项
     * @param {string} name 文件名
     */
    handleClickDropdown(name) {
      this.$emit("input", name);
      this.$emit("change");
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
    padding: 10px;
    font-size: calc(1em + 2px);
  }

  .navbarMenu_dropdown {
    -webkit-app-region: no-drag;

    .navbarMenu_dropdown_content {
      cursor: pointer;
      color: var(--font-color-base);
      padding: 10px 10px;
    }
  }
}
</style>
