<template>
  <div class="layout">
    <!-- 页面布局 start -->
    <el-container class="layout_container">
      <el-header :class="headerClass" height="40px">
        <header-content />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <!-- 页面布局 end -->

    <!-- 回到顶部 start -->
    <el-backtop>
      <icon-font icon="el-icon-caret-top" />
    </el-backtop>
    <!-- 回到顶部 end -->
  </div>
</template>

<script>
import IconFont from "../components/IconFont.vue";
import headerContent from "./components/headerContent.vue";

export default {
  data() {
    return {
      windowScrollTop: null, // 窗口Y轴滚动位置
    };
  },
  computed: {
    // 头部 class
    headerClass() {
      return [
        "layout_container_header",
        {
          layout_container_header_shadow: this.windowScrollTop > 10,
        },
      ];
    },
  },
  created() {
    this.init();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handlerWindowScroll);
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
    },
    /**
     * @name: 处理窗口滚动
     */
    handlerWindowScroll() {
      this.windowScrollTop = window.scrollY;
    },
  },
  components: {
    headerContent,
    IconFont,
  },
};
</script>

<style lang="scss" scoped>
.layout {
  .layout_container {
    .layout_container_header {
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      background-color: var(--background-color);
      z-index: 99;

      &.layout_container_header_shadow {
        box-shadow: 0 -5px 8px 0 var(--font-color-dark);
      }
    }
  }
}
</style>
