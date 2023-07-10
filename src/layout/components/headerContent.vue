<template>
  <el-row class="headerContent" :gutter="20" type="flex" align="middle">
    <el-col class="headerContent_left" :span="9">
      <icon-font class="headerContent_left_icon" icon="el-icon-menu" />
    </el-col>
    <el-col class="headerContent_title" :span="6">
      <el-dropdown
        class="headerContent_title_dropdown"
        trigger="click"
        @command="handleClickDropdown"
      >
        <span class="headerContent_title_dropdown_content"
          >{{ command.label }} <icon-font icon="el-icon-arrow-down"
        /></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in dropDownList"
            :key="index"
            :icon="item.icon"
            :command="item"
            :divided="index !== 0"
            >{{ item.label }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
    <el-col class="headerContent_right" :span="9">
      <icon-font class="headerContent_right_icon" icon="minimize" />
      <icon-font class="headerContent_right_icon" icon="maximize" />
      <icon-font class="headerContent_right_icon" icon="close" />
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      command: null, // 当前选中的菜单项
      dropDownList: [], // 下拉菜单列表
    };
  },
  created() {
    this.init();
  },
  methods: {
    /**
     * @name: 初始化
     */
    init() {
      this.dropDownList = [
        { icon: "el-icon-box", label: "仓库", value: "store" },
        { icon: "el-icon-takeaway-box", label: "杂物间", value: "recycleBin" },
        { icon: "el-icon-delete", label: "回收站", value: "recycleBin" },
      ];
      this.command = this.dropDownList[0];
    },
    /**
     * @name: 处理点击下拉菜单项
     * @param {string} command 指令名称
     */
    handleClickDropdown(command) {
      this.command = command;
    },
  },
};
</script>

<style lang="scss" scoped>
.headerContent {
  height: 100%;
  user-select: none;

  .headerContent_left {
    text-align: left;

    .headerContent_left_icon {
      cursor: pointer;
    }
  }

  .headerContent_title {
    text-align: center;

    .headerContent_title_dropdown {
      .headerContent_title_dropdown_content {
        cursor: pointer;
        color: var(--font-color-base);
      }
    }
  }

  .headerContent_right {
    text-align: right;
    color: var(--font-color-light);

    .headerContent_right_icon {
      margin-left: 20px;
      cursor: pointer;
      font-size: calc(var(--font-size-base) - 4px);
    }
  }
}
</style>
