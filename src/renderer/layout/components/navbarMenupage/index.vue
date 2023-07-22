<template>
  <navbar class="navbarMenu">
    <template #left>
      <icon-font
        class="navbarMenu_button"
        icon="el-icon-plus"
        @click="handleClickAdd"
      />
    </template>
    <template #title="{ title }">
      <el-dropdown
        class="navbarMenu_dropdown"
        trigger="click"
        @command="handleClickDropdown"
      >
        <span class="navbarMenu_dropdown_content"
          >{{ title }} <icon-font icon="el-icon-arrow-down"
        /></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in menuList"
            :key="index"
            :icon="item.icon"
            :command="item.value"
            :divided="index !== 0"
            >{{ item.label }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </template>
  </navbar>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  data() {
    return {
      menuList: [
        { icon: "el-icon-box", label: "仓库", value: "store" },
        { icon: "el-icon-takeaway-box", label: "临时区", value: "temporaries" },
        { icon: "el-icon-delete", label: "回收站", value: "recycleBin" },
      ], // 菜单列表
    };
  },
  methods: {
    /**
     * @name: 处理点击添加按钮
     */
    handleClickAdd() {
      this.$emit("add");
    },
    /**
     * @name: 处理点击下拉菜单项
     * @param {string} name 菜单名
     */
    handleClickDropdown(name) {
      if (this.$route.name !== name) {
        this.$router.push({ name });
      }
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

  .navbarMenu_dropdown {
    -webkit-app-region: no-drag;

    .navbarMenu_dropdown_content {
      cursor: pointer;
      color: var(--font-color-base);
    }
  }
}
</style>
