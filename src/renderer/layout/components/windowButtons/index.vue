<!--
 * @FileName: layout.windowButtons
 * @FilePath: \fileManage\src\renderer\layout\components\windowButtons\index.vue
 * @Author: YH
 * @Date: 2023-10-10 11:42:32
 * @LastEditors: YH
 * @LastEditTime: 2023-10-10 14:40:51
 * @Description: 布局-窗口控制按钮
-->
<template>
  <div class="windowButtons">
    <icon-font
      class="windowButtons_button"
      icon="minimize"
      title="最小化"
      @click.native="() => $electron.windowMin()"
    />
    <icon-font
      class="windowButtons_button"
      :icon="isMaximized ? 'restore' : 'maximize'"
      :title="isMaximized ? '还原' : '最大化'"
      @click.native="() => $electron.windowMax()"
    />
    <icon-font
      class="windowButtons_button"
      icon="close"
      title="关闭"
      @click.native="() => $electron.windowClose()"
    />
  </div>
</template>

<script>
export default {
  name: "windowButtons",
  data() {
    return {
      isMaximized: false, // 是否全屏状态
    };
  },
  created() {
    window.addEventListener("resize", this.handlerWindowResize);
    this.handlerWindowResize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handlerWindowResize);
  },
  methods: {
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
$z-index: 9999; // 整体悬浮层级高度

.windowButtons {
  -webkit-app-region: no-drag;
  user-select: none;
  position: fixed;
  top: 0;
  right: 0;
  z-index: $z-index;
  height: var(--header-bar-height);
  display: flex;
  align-items: center;
  padding-right: 10px;

  .windowButtons_button {
    padding: 10px 20px;
    font-size: calc(1em - 4px);
    color: var(--font-color-dark);
    transition: all var(--transition-duration-base);

    &:hover {
      color: var(--font-color-light);
      background-color: rgba(0, 0, 0, 0.3);
    }

    &:last-child:hover {
      background-color: rgba(255, 0, 0, 0.8);
    }
  }
}
</style>
