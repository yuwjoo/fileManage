<!--
 * @FileName: 
 * @FilePath: \fileManage\src\renderer\components\Navbar\index.vue
 * @Author: YH
 * @Date: 2023-07-20 10:41:01
 * @LastEditors: YH
 * @LastEditTime: 2023-07-20 16:26:52
 * @Description: 头部导航栏
-->
<template>
  <div class="navbar">
    <el-row
      :class="['navbar_row', { 'navbar_row--shadow': navbarShadow }]"
      :gutter="20"
      type="flex"
    >
      <el-col class="navbar_col navbar_left" :span="8">
        <slot name="left" />
      </el-col>
      <el-col class="navbar_col navbar_title" :span="8">
        <slot name="title" :title="navbarTitle">{{ navbarTitle }}</slot>
      </el-col>
      <el-col class="navbar_col navbar_right" :span="8">
        <slot name="beforeRight" />
        <slot name="right">
          <icon-font
            class="navbar_right_icon"
            icon="minimize"
            @click="handleWindowMin"
          />
          <icon-font
            class="navbar_right_icon"
            :icon="isMaximized ? 'restore' : 'maximize'"
            @click="handleWindowMax"
          />
          <icon-font
            class="navbar_right_icon"
            icon="close"
            @click="handleWindowClose"
          />
        </slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    // 标题
    title: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      isMaximized: false, // 是否全屏状态
      navbarShadow: false, // 显示导航栏阴影
    };
  },
  computed: {
    // 当前导航栏标题
    navbarTitle() {
      return this.title || this.$route.meta.title;
    },
  },
  created() {
    this.init();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handlerWindowScroll);
    window.removeEventListener("resize", this.handlerWindowResize);
  },
  methods: {
    /**
     * @name: 初始化
     */
    init() {
      window.addEventListener("scroll", this.handlerWindowScroll, {
        passive: true,
      });
      this.handlerWindowScroll();
      window.addEventListener("resize", this.handlerWindowResize);
      this.handlerWindowResize();
    },
    /**
     * @name: 窗口最小化
     */
    handleWindowMin() {
      this.$electron.windowMin();
    },
    /**
     * @name: 窗口放大/缩小
     */
    handleWindowMax() {
      this.$electron.windowMax();
    },
    /**
     * @name: 窗口关闭
     */
    handleWindowClose() {
      this.$electron.windowClose();
    },
    /**
     * @name: 处理窗口滚动
     */
    handlerWindowScroll() {
      this.navbarShadow = window.scrollY > 10;
    },
    /**
     * @name: 处理窗口大小改变
     */
    handlerWindowResize() {
      this.$electron.getWindowMaximized().then((isMaximized) => {
        this.isMaximized = isMaximized;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  user-select: none;
  height: 40px;

  .navbar_row {
    margin-left: 0 !important;
    -webkit-app-region: drag;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 10px;
    height: 40px;
    background-color: var(--theme-color);
    z-index: 99;

    &.navbar_row--shadow {
      box-shadow: 0 -5px 8px 0 var(--font-color-secondary);
    }
  }

  .navbar_col {
    display: flex;
    align-items: center;

    &.navbar_left {
      justify-content: flex-start;
    }

    &.navbar_title {
      justify-content: center;
    }

    &.navbar_right {
      justify-content: flex-end;
      color: var(--font-color-light);

      .navbar_right_icon {
        -webkit-app-region: no-drag;
        margin-left: 20px;
        cursor: pointer;
        font-size: calc(var(--font-size-base) - 4px);
      }
    }
  }
}
</style>
