<template>
  <div class="navMenuBar">
    <div class="navMenuBar_header"></div>

    <div class="navMenuBar_menu">
      <div
        class="navMenuBar_menu_item"
        :class="{
            'active': activeIndex === index
        }"
        v-for="(item, index) in menuList"
        :key="index"
        @click="handleClickMenuItem(item, index)"
      >
        <icon-font :icon="item.icon" />
        <!-- <span>{{ item.name }}</span> -->
      </div>

        <svg class="navMenuBar_menu_activeIcon" :style="`top: calc(-21px + ${activeIndex * 58}px)`">
            <rect x="0" y="30" width="100%" height="40" rx="20" ry="20" fill="#ffffff"/>
            <rect x="50%" y="15" width="50%" height="70" rx="0" ry="0" fill="#ffffff"/>
            <rect x="0" y="0" width="100%" height="30" rx="15" ry="15" fill="#7a40f2"/>
            <rect x="0" y="70" width="100%" height="30" rx="15" ry="15" fill="#7a40f2"/>
        </svg>
    </div>
    <div class="navMenuBar_footer"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [], // 菜单列表
      activeIndex: -1
    };
  },
  created() {
    this.menuList = [
      { icon: "el-icon-menu", label: "首页", name: "a" },
      { icon: "el-icon-plus", label: "首页", name: "b" },
      { icon: "el-icon-menu", label: "首页", name: "c" },
      { icon: "el-icon-plus", label: "首页", name: "d" },
      { icon: "el-icon-menu", label: "首页", name: "e" },
      { icon: "el-icon-plus", label: "首页", name: "f" },
    ];
  },
  methods: {
    handleClickMenuItem(item, index) {
        this.activeIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
$BG_COLOR: rgb(122, 64, 242); // 背景颜色

.navMenuBar {
  background-color: $BG_COLOR;
  color: white;
  font-size: 18px;
  width: 80px;
  height: 100vh;
  border-radius: 0 10px 10px 0;
  line-height: 0;

  .navMenuBar_header {
    height: 20vh;
  }

  .navMenuBar_menu {
    text-align: center;
    position: relative;
    overflow: hidden;

    .navMenuBar_menu_item {
      padding: 20px;
      cursor: pointer;
      position: relative;
      z-index: 1;

      &.active {
        color: $BG_COLOR;
      transition: color 0.1s 0.2s;
      }
    }

    .navMenuBar_menu_activeIcon {
      position: absolute;
      right: 0;
      z-index: 0;
      transition: top 0.3s;
      width: 75%;
      height: 100px;
    }
  }

  .navMenuBar_footer {
  }
}
</style>
