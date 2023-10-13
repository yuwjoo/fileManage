<!--
 * @FileName: layout.navBar
 * @FilePath: \fileManage\src\renderer\layout\components\navBar\index.vue
 * @Author: YH
 * @Date: 2023-09-25 13:57:49
 * @LastEditors: YH
 * @LastEditTime: 2023-10-13 13:59:28
 * @Description: 布局-导航栏
-->
<template>
  <div :class="['navBar', { 'is-open': $store.state.layout.openSidebar }]">
    <div class="navBar_header">
      <icon-font
        class="navBar_header_logo"
        :icon="
          $store.state.layout.openSidebar
            ? 'el-icon-s-fold'
            : 'el-icon-s-unfold'
        "
        size="18px"
        @click.native="
          $store.commit(
            'layout/setOpenSidebar',
            !$store.state.layout.openSidebar
          )
        "
      />
    </div>

    <div class="navBar_menu">
      <div
        :class="[
          'navBar_menu_item',
          {
            'is-active': $route.meta.matched.find(
              (route) => route.name === item.name
            ),
          },
        ]"
        v-for="item in $store.getters['layout/menuList']"
        :key="item.name"
        :title="item.meta.title"
        @click="$router.push({ name: item.name })"
      >
        <icon-font
          class="navBar_menu_item_icon"
          :icon="item.meta.icon"
          size="18px"
        />
        <span class="navBar_menu_item_title">{{ item.meta.title }}</span>
      </div>
      <div class="navBar_menu_silder"></div>
    </div>

    <div class="navBar_footer">
      <icon-font
        class="navBar_footer_setting"
        icon="el-icon-s-tools"
        size="18px"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "navBar",
};
</script>

<style lang="scss" scoped>
$NAV_WIDTH: 80px; // 导航栏宽度
$NAV_OPEN_WIDTH: 130px; // 导航栏展开宽度
$MENU_ITEM_NUM: 6; // 菜单项个数

.navBar {
  background-color: var(--primary-color);
  color: var(--font-color-light);
  width: $NAV_WIDTH;
  height: 100vh;
  border-radius: 0 var(--border-radius-base) var(--border-radius-base) 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width var(--transition-duration-base);
  user-select: none;
  overflow: hidden;

  &.is-open {
    width: $NAV_OPEN_WIDTH;

    .navBar_menu {
      .navBar_menu_item {
        .navBar_menu_item_title {
          opacity: 1;
        }
      }

      .navBar_menu_silder::before {
        border-radius: var(--border-radius-big) 50% 50% var(--border-radius-big);
      }
    }
  }

  .navBar_header {
    .navBar_header_logo {
      padding: 20px 0;
      display: block;
      margin: 0 auto;
      text-align: center;
      cursor: pointer;
    }
  }

  .navBar_menu {
    overflow: hidden;
    position: relative;
    padding: 11px 0;

    .navBar_menu_item {
      padding: 20px 0 20px 31px;
      box-sizing: border-box;
      cursor: pointer;
      width: $NAV_OPEN_WIDTH;
      position: relative;
      z-index: 1;

      &.is-active {
        color: var(--primary-color);
        transition: color 0.1s 0.2s;
      }

      @for $i from 1 through $MENU_ITEM_NUM {
        &:nth-child(#{$i}).is-active ~ .navBar_menu_silder {
          top: ($i - 1) * 58px;
          transform: scale(1);
        }
      }

      .navBar_menu_item_title {
        opacity: 0;
        margin-left: 10px;
        transition: opacity var(--transition-duration-base);
      }
    }

    .navBar_menu_silder {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 0;
      width: calc(100% - 20px);
      height: 80px;
      padding-left: 20px;
      box-sizing: border-box;
      background-color: var(--background-color);
      background-clip: content-box;
      transform: scale(0);
      transform-origin: 100% 50%;
      transition: top var(--transition-duration-base),
        transform var(--transition-duration-base) 0.2s;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 100%;
        height: 40px;
        background-color: var(--background-color);
        border-radius: var(--border-radius-big);
        box-shadow: 0 -40px 0 0 var(--primary-color),
          0 40px 0 0 var(--primary-color);
        transition: border-radius var(--transition-duration-base);
      }
    }
  }

  .navBar_footer {
    .navBar_footer_setting {
      padding: 20px 0;
      display: block;
      margin: 0 auto;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
