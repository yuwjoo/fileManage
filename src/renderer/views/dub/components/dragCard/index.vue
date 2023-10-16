<template>
  <div
    class="dragCard"
    @mousedown="handleMousedown"
    @mousemove="handleMousemove"
    @mouseup="handleMouseup"
  >
    <div
      :class="[
        'dragCard_item',
        {
          'is-drag': dargIndex === index,
          'is-cover-to-right': activeIndex < dargIndex && index < dargIndex,
          'is-cover-to-left': activeIndex > dargIndex && index > dargIndex,
          'is-active': activeIndex === index,
        },
      ]"
      ref="dragItem"
      v-for="(item, index) in value"
      :key="index"
      :style="{ width: `${dragItemWidth}px`, height: `${dragItemHeight}px` }"
      :data-dragindex="index"
    >
      <div class="dragCard_item_underlay">
        <icon-font
          class="dragCard_item_underlay_icon"
          size="30px"
          icon="el-icon-minus"
        />
      </div>
      <div class="dragCard_item_entity">{{ item.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 数据
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dragItemWidth: 70, // 拖拽项宽度
      dragItemHeight: 70, // 拖拽项高度
      dargIndex: -1, // 当前拖拽元素下标
      activeIndex: Infinity, // 当前激活的位置下标
      mouseStartX: 0, // 鼠标开始点
      mouseStartY: 0, // 鼠标开始点
    };
  },
  methods: {
    handleMousedown(ev) {
      let target = ev.target;
      while (target && target.dataset.dragindex === undefined) {
        target = target.parentElement;
      }
      if (!target) return;
      this.dargIndex = Number(target.dataset.dragindex);
      this.mouseStartX = ev.clientX;
      this.mouseStartY = ev.clientY;
    },
    handleMousemove(ev) {
      window.requestAnimationFrame(() => {
        if (this.dargIndex === -1) return;
        const diffX = ev.clientX - this.mouseStartX;
        const diffY = ev.clientY - this.mouseStartY;
        const target = this.$refs.dragItem[this.dargIndex];
        console.log(`translate(${diffX}px, ${diffY}px)`);
        target.style.transform = `translate(${diffX}px, ${diffY}px)`;
      });
      // if (diffX >= 0) {
      //   this.activeIndex = Infinity;
      // } else {
      //   const conut = Math.abs(diffX) / 70;
      //   const num = diffX % 70 >= 35 ? 1 : 0;
      //   this.activeIndex = conut + num;
      // }
    },
    handleMouseup() {
      this.dargIndex = -1;
    },
  },
};
</script>

<style lang="scss" scoped>
.dragCard {
  display: flex;

  .dragCard_item {
    position: relative;

    &.is-drag {
      transform: scale(1.1);
      transition: transform var(--transition-duration-base);
      z-index: 1;

      .dragCard_item_entity {
        border: 1px solid var(--base-color-2);
      }
    }

    &.is-cover-to-left {
      // transform: translateX(100%);
    }

    &.is-cover-to-right {
      // transform: translateX(-100%);
    }

    &.is-active {
      .dragCard_item_underlay {
        border-color: var(--base-color-1);
      }
    }

    .dragCard_item_underlay {
      width: inherit;
      height: inherit;
      color: #ccc;
      border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: var(--border-radius-small);
      box-sizing: border-box;
    }

    .dragCard_item_entity {
      width: inherit;
      height: inherit;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: var(--border-radius-small);
      background-color: white;
      user-select: none;
      cursor: pointer;
      box-sizing: border-box;
    }
  }
}
</style>
