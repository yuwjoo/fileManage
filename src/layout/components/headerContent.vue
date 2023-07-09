<template>
  <el-row class="headerContent" :gutter="20" type="flex" align="middle">
    <el-col class="headerContent_left" :span="9">
      <icon-font class="headerContent_left_icon" icon="el-icon-menu" />
    </el-col>
    <el-col class="headerContent_title" :span="6">
      <el-dropdown trigger="click" @command="handleClickDropdown">
        <span>仓库 <icon-font icon="el-icon-arrow-down" /></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-box" command="store">仓库</el-dropdown-item>
          <el-dropdown-item icon="el-icon-delete" command="recycleBin" divided>回收站</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
    <el-col class="headerContent_right" :span="9">
      <icon-font class="headerContent_right_icon" icon="close" />
      <icon-font class="headerContent_right_icon" icon="toc" />
      <icon-font class="headerContent_right_icon" icon="import_file" />
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    /**
     * @name: 处理点击下拉菜单项
     * @param {string} command 指令名称
     */
    handleClickDropdown(command) {
      console.log("点击", command);
    },
  },
};
</script>

<style lang="scss" scoped>
.headerContent {
  height: 100%;

  .headerContent_left {
    text-align: left;

    .headerContent_left_icon {
      cursor: pointer;
    }
  }

  .headerContent_title {
    text-align: center;
  }

  .headerContent_right {
    text-align: right;
    color: var(--font-color-light);

    .headerContent_right_icon {
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
</style>
