<template>
  <div :class="['navMenuBar', { 'is-open': isOpen }]">
    <div class="navMenuBar_header">
      <icon-font class="navMenuBar_header_logo" icon="el-icon-eleme" />
    </div>

    <div class="navMenuBar_menu">
      <div
        :class="['navMenuBar_menu_item', { 'is-active': item.name === active }]"
        v-for="item in menuList"
        :key="item.name"
        :title="item.label"
        @click="handleClickMenuItem(item)"
      >
        <icon-font class="navMenuBar_menu_item_icon" :icon="item.icon" />
        <span class="navMenuBar_menu_item_label">{{ item.label }}</span>
      </div>
      <div class="navMenuBar_menu_silder"></div>
    </div>

    <div class="navMenuBar_footer">
      <icon-font
        class="navMenuBar_footer_open"
        :icon="isOpen ? 'el-icon-back' : 'el-icon-right'"
        @click="isOpen = !isOpen"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [], // 菜单列表
      active: "", // 当前激活菜单项
      isOpen: false, // 是否展开
    };
  },
  created() {
    this.menuList = [
      { icon: "el-icon-menu", label: "首页", name: "a" },
      { icon: "el-icon-plus", label: "回收站", name: "b" },
      { icon: "el-icon-menu", label: "首页", name: "c" },
      { icon: "el-icon-plus", label: "回收站", name: "d" },
      { icon: "el-icon-menu", label: "首页", name: "e" },
      { icon: "el-icon-plus", label: "回收站", name: "f" },
    ];
  },
  methods: {
    handleClickMenuItem(item) {
      this.active = item.name;
    },
  },
};
</script>

<style lang="scss" scoped>
$BG_COLOR: #7a40f2; // 背景颜色
$MENU_ITEM_NUM: 6; // 菜单项个数

.navMenuBar {
  background-color: $BG_COLOR;
  color: white;
  width: 80px;
  height: 100vh;
  border-radius: 0 10px 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 0.3s;

  &.is-open {
    width: 130px;

    .navMenuBar_menu {
      .navMenuBar_menu_item {
        .navMenuBar_menu_item_label {
          opacity: 1;
          transition: opacity 0.3s;
        }
      }
    }
  }

  .navMenuBar_header {
    text-align: center;

    .navMenuBar_header_logo {
      padding-top: 20px;
      font-size: 30px;
    }
  }

  .navMenuBar_menu {
    overflow: hidden;
    position: relative;
    padding: 11px 0;

    .navMenuBar_menu_item {
      padding: 20px 0 20px 31px;
      box-sizing: border-box;
      cursor: pointer;
      width: 100%;
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;

      &.is-active {
        color: $BG_COLOR;
        transition: color 0.1s 0.2s;
      }

      @for $i from 1 through $MENU_ITEM_NUM {
        &:nth-child(#{$i}).is-active ~ .navMenuBar_menu_silder {
          top: ($i - 1) * 58px;
          transform: scale(1);
        }
      }

      .navMenuBar_menu_item_icon {
        font-size: 18px;
      }

      .navMenuBar_menu_item_label {
        opacity: 0;
        font-size: 14px;
        margin-left: 10px;
      }
    }

    .navMenuBar_menu_silder {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 0;
      width: calc(100% - 20px);
      height: 80px;
      padding-left: 20px;
      box-sizing: border-box;
      background-color: white;
      background-clip: content-box;
      transform: scale(0);
      transform-origin: 100% 50%;
      transition: top 0.3s, transform 0.3s 0.2s;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 100%;
        height: 40px;
        background-color: white;
        border-radius: 20px;
        box-shadow: 0 -40px 0 0 $BG_COLOR, 0 40px 0 0 $BG_COLOR;
      }
    }
  }

  .navMenuBar_footer {
    .navMenuBar_footer_open {
      padding: 20px 0;
      font-size: 18px;
      display: block;
      margin: 0 auto;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
