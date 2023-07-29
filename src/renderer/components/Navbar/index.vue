<!--
 * @FileName: 
 * @FilePath: \fileManage\src\renderer\components\Navbar\index.vue
 * @Author: YH
 * @Date: 2023-07-20 10:41:01
 * @LastEditors: YH
 * @LastEditTime: 2023-07-29 16:34:59
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
            title="最小化"
            @click="handleWindowMin"
          />
          <icon-font
            class="navbar_right_icon"
            :icon="isMaximized ? 'restore' : 'maximize'"
            :title="isMaximized ? '还原' : '最大化'"
            @click="handleWindowMax"
          />
          <icon-font
            class="navbar_right_icon"
            icon="close"
            title="关闭"
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
      window.addEventListener("resize", this.handlerWindowResize);
      this.handlerWindowScroll();
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
$navbar-height: 40px; // 导航栏高度
$navbar-z-index: 99; // 导航栏悬浮层级高度

.navbar {
  user-select: none;
  height: $navbar-height;

  .navbar_row {
    margin-left: 0 !important;
    -webkit-app-region: drag;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $navbar-height;
    background-color: var(--theme-color);
    z-index: $navbar-z-index;

    &.navbar_row--shadow {
      box-shadow: var(--box-shadow-base);
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
        padding: 10px 20px;
        font-size: calc(1em - 4px);
        transition: background-color var(--transition-duration-base);

        &:hover {
          background-color: var(--background-color-active);
        }

        &:last-child:hover {
          background-color: var(--danger-color);
        }
      }
    }
  }
}
</style>
