<template>
  <div
    :class="[
      'scrollbar',
      {
        'scrollbar--active': startDragY !== -1,
      },
    ]"
    :style="{
      visibility: showScrollbar ? 'visible' : 'hidden',
    }"
    @mousedown="handleRootMousedownCallback"
  >
    <div
      class="scrollbar_thumb"
      :style="{
        height: `${height}px`,
        marginTop: `${position}px`,
      }"
      @mousedown.stop="startDragY = position - $event.clientY"
    ></div>
  </div>
</template>

<script>
export default {
  name: "scrollbar",
  data() {
    return {
      showScrollbar: false, // 显示滚动条
      position: 0, // 滚动条位置
      height: 0, // 滚动条高度
      resizeObserver: new ResizeObserver(this.handleResizeCallback), // DOM大小监听器
      startDragY: -1, // 起始拖拽位置
      scrollAnimationFrame: null, // 滚动动画帧
    };
  },
  created() {
    document.addEventListener("scroll", this.handleScrollCallback, {
      passive: true,
    });
    document.addEventListener("mousemove", this.handleMousemoveCallback);
    document.addEventListener("mouseup", this.handleMouseupCallback);
    this.resizeObserver.observe(document.scrollingElement);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.handleScrollCallback);
    document.removeEventListener("mousemove", this.handleMousemoveCallback);
    document.removeEventListener("mouseup", this.handleMouseupCallback);
    this.resizeObserver.disconnect();
  },
  methods: {
    /**
     * @name: 处理滚动容器大小改变
     */
    handleResizeCallback() {
      const target = document.scrollingElement;
      const barHeight = this.$el.offsetHeight;
      this.showScrollbar = target.scrollHeight > target.clientHeight;
      this.height = (target.clientHeight / target.scrollHeight) * barHeight;
      this.handleScroll((target.scrollTop / target.scrollHeight) * barHeight);
    },
    /**
     * @name: 处理滚动条监听鼠标按下
     * @param {event} ev 鼠标事件
     */
    handleRootMousedownCallback(ev) {
      const clientRect = ev.target.getBoundingClientRect();
      this.handleScroll(ev.clientY - clientRect.top - this.height / 2, true);
      this.startDragY = this.position - ev.clientY;
    },
    /**
     * @name: 处理监听滚动
     */
    handleScrollCallback() {
      if (this.startDragY !== -1) return;
      window.cancelAnimationFrame(this.scrollAnimationFrame);
      this.scrollAnimationFrame = window.requestAnimationFrame(() => {
        const target = document.scrollingElement;
        const barHeight = this.$el.offsetHeight;
        this.handleScroll((target.scrollTop / target.scrollHeight) * barHeight);
      });
    },
    /**
     * @name: 处理鼠标移动
     * @param {event} ev 移动事件
     */
    handleMousemoveCallback(ev) {
      if (this.startDragY === -1) return;
      window.cancelAnimationFrame(this.scrollAnimationFrame);
      this.scrollAnimationFrame = window.requestAnimationFrame(() => {
        this.handleScroll(ev.clientY + this.startDragY, true);
      });
    },
    /**
     * @name: 处理鼠标抬起
     */
    handleMouseupCallback() {
      this.startDragY = -1;
    },
    /**
     * @name: 处理滚动
     * @param {number} position 最新滚动位置
     * @param {boolean} scrollDom 是否更新DOM滚动位置
     */
    handleScroll(position, scrollDom) {
      const target = document.scrollingElement;
      const barHeight = this.$el.offsetHeight;
      this.position = Math.max(Math.min(position, barHeight - this.height), 0);
      if (scrollDom) {
        target.scrollTop = target.scrollHeight * (this.position / barHeight);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$navbar-height: 40px; // 导航栏高度
$scrollbar-margin: 2px; // 滚动条边距
$scrollbar-width-base: 5px; // 滚动条常态时宽度
$scrollbar-width-active: 12px; // 滚动条激活时宽度

.scrollbar {
  position: fixed;
  z-index: 99;
  right: 0;
  top: $navbar-height + $scrollbar-margin;
  height: calc(100vh - $navbar-height - $scrollbar-margin * 2);
  width: $scrollbar-width-active;
  padding-left: calc($scrollbar-width-active - $scrollbar-width-base);
  box-sizing: border-box;
  background-color: var(--background-color-block-input);
  background-clip: content-box;
  overflow: hidden;
  transition: padding-left var(--transition-duration-fast);
  user-select: none;

  &:hover,
  &.scrollbar--active {
    padding-left: 0;
  }

  .scrollbar_thumb {
    background-color: var(--font-color-secondary);

    &:hover {
      background-color: var(--font-color-base);
    }
  }
}
</style>
