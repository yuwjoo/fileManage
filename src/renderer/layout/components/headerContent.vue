<template>
  <el-row class="headerContent" :gutter="20" type="flex" align="middle">
    <el-col class="headerContent_left" :span="9">
      <icon-font class="headerContent_left_icon" icon="el-icon-menu" @click="handleOpenMenu" />
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
      <icon-font
        class="headerContent_right_icon"
        icon="minimize"
        @click="handleWindowMin"
      />
      <icon-font
        class="headerContent_right_icon"
        :icon="isMaximized ? 'restore' : 'maximize'"
        @click="handleWindowMax"
      />
      <icon-font
        class="headerContent_right_icon"
        icon="close"
        @click="handleWindowClose"
      />
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      command: {}, // 当前选中的菜单项
      dropDownList: [], // 下拉菜单列表
      isMaximized: false, // 是否全屏状态
    };
  },
  created() {
    this.init();
  },
  methods: {
    /**
     * @name: 初始化
     */
    async init() {
      this.isMaximized = await window.electronAPI.getWindowMaximized();
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
    /**
     * @name: 窗口最小化
     */
    handleWindowMin() {
      window.electronAPI.windowMin();
    },
    /**
     * @name: 窗口放大/缩小
     */
    async handleWindowMax() {
      this.isMaximized = await window.electronAPI.windowMax();
    },
    /**
     * @name: 窗口关闭
     */
    handleWindowClose() {
      window.electronAPI.windowClose();
    },
    /**
     * @name: 处理打开菜单
     */
    handleOpenMenu() {
      window.electronAPI.openMenu("file");
    }
  },
};
</script>

<style lang="scss" scoped>
.headerContent {
  -webkit-app-region: drag;
  height: 100%;
  user-select: none;

  .headerContent_left {
    text-align: left;

    .headerContent_left_icon {
      cursor: pointer;
      -webkit-app-region: no-drag;
    }
  }

  .headerContent_title {
    text-align: center;

    .headerContent_title_dropdown {
      -webkit-app-region: no-drag;
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
      -webkit-app-region: no-drag;
      margin-left: 20px;
      cursor: pointer;
      font-size: calc(var(--font-size-base) - 4px);
    }
  }
}
</style>
