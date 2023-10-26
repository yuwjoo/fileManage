<template>
  <div
    :class="[
      'dragCard',
      {
        'is-drag': mode === 'drag',
        'is-dragging': mouse.state !== 'noDrag',
      },
    ]"
    @mousedown="handleMousedown"
  >
    <!-- 背景层 start -->
    <div class="dragCard_background" :style="containerStyle">
      <div
        v-for="(entity, index) in itemList"
        :class="[
          'dragCard_background_item',
          {
            'is-hover': entity.isHover,
          },
        ]"
        :key="index"
        :style="itemStyle"
      >
        <slot name="underlay" :item="entity.item" />
      </div>
    </div>
    <!-- 背景层 end -->

    <!-- 前景层 start -->
    <div class="dragCard_foreground" :style="containerStyle">
      <div
        v-for="(entity, index) in itemList"
        :class="[
          'dragCard_foreground_item',
          {
            'is-drag': entity.isDrag,
            'is-move': entity.isMove,
          },
        ]"
        ref="items"
        :key="index"
        :style="[itemStyle, entity.isDrag ? itemDragStyle : entity.moveStyle]"
        @click="handleClickItem(entity.item)"
      >
        <slot :item="entity.item">{{ entity.item.value }}</slot>
      </div>
    </div>
    <!-- 前景层 end -->
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
    // 模式
    mode: {
      type: String,
      default: "drag",
      validator: (val) => ["preview", "drag"].includes(val),
    },
    // 行数
    rows: {
      type: [Number, String],
      default: "auto-fill",
      validator: (val) => typeof val === "number" || val === "auto-fill",
    },
    // 列数
    cols: {
      type: [Number, String],
      default: "auto-fill",
      validator: (val) => typeof val === "number" || val === "auto-fill",
    },
    // 行间隔
    rowGap: {
      type: Number,
      default: 20,
    },
    // 列间隔
    colGap: {
      type: Number,
      default: 20,
    },
    // 元素宽度
    itemWidth: {
      type: Number,
      default: 50,
    },
    // 元素高度
    itemHeight: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      dragIndex: -1, // 拖拽元素下标
      hoverIndex: -1, // 指向元素下标
      mouse: {
        state: "noDrag", // 鼠标状态：noDrag；未拖拽，startDrag：开始拖拽，endDrag：结束拖拽
        startX: 0, // 拖拽起始坐标
        startY: 0, // 拖拽起始坐标
        moveX: 0, // 拖拽移动坐标
        moveY: 0, // 拖拽移动坐标
        moveFrame: null, // 移动动画帧
      },
      matrix: {
        map: null, // 位置映射
        rows: 0, // 实际列数
        cols: 0, // 实际行数
        left: 0, // 左边距
        top: 0, // 上边距
        topRight: 0, // 到最右边边距
        toBottom: 0, // 到最下边边距
      },
      itemList: [], // 元素列表
    };
  },
  computed: {
    // 容器样式
    containerStyle() {
      return {
        "grid-template-columns": `repeat(${this.cols}, ${this.itemWidth}px)`,
        "grid-template-rows": `repeat(${this.rows}, ${this.itemHeight}px)`,
        "row-gap": `${this.rowGap}px`,
        "column-gap": `${this.colGap}px`,
      };
    },
    // 元素样式
    itemStyle() {
      return {
        width: `${this.itemWidth}px`,
        height: `${this.itemHeight}px`,
      };
    },
    // 元素样式（被拖拽）
    itemDragStyle() {
      return {
        transform: `translate(
          ${this.mouse.moveX - this.mouse.startX + 5}px,
          ${this.mouse.moveY - this.mouse.startY - 5}px
        )`,
      };
    },
    // 元素总数
    itemCount() {
      return this.value.length;
    },
  },
  watch: {
    value: {
      handler: "initItemList",
      immediate: true,
    },
  },
  created() {
    document.addEventListener("mousemove", this.handleMousemove);
    document.addEventListener("mouseup", this.handleMouseup);
  },
  beforeDestroy() {
    document.removeEventListener("mousemove", this.handleMousemove);
    document.removeEventListener("mouseup", this.handleMouseup);
  },
  methods: {
    /**
     * @description: 初始化矩阵数据
     */
    initMatrix() {
      const { top, left, height } = this.$el.getBoundingClientRect();
      const rows = Math.ceil(height / (this.itemHeight + this.rowGap));
      const cols =
        rows - 1 > 0
          ? Math.floor((this.itemCount - 1) / (rows - 1))
          : this.itemCount;
      const map = this.value.map((_, index) => {
        const itemCol = (index + 1) % cols || cols;
        const itemRow = Math.ceil((index + 1) / cols);
        return {
          left: left + (itemCol - 1) * (this.itemWidth + this.colGap),
          top: top + (itemRow - 1) * (this.itemHeight + this.rowGap),
        };
      });
      const toRight = left + this.itemWidth * cols + this.colGap * (cols - 1);
      const toBottom = top + this.itemHeight * rows + this.rowGap * (rows - 1);
      this.matrix = { map, rows, cols, left, top, toRight, toBottom };
    },
    /**
     * @description: 初始化元素列表
     */
    initItemList() {
      this.itemList = this.value.map((item, index) => {
        if (this.mouse.state !== "noDrag") {
          const { order, isMove, moveStyle } = this.handleItemMove(index);
          return {
            item,
            order,
            isHover: index === this.hoverIndex,
            isDrag:
              index === this.dragIndex && this.mouse.state === "startDrag",
            isMove,
            moveStyle: order !== index ? moveStyle : "",
          };
        } else {
          return {
            item,
            order: index,
            isHover: false,
            isDrag: false,
            isMove: false,
            moveStyle: "",
          };
        }
      });
    },
    /**
     * @description: 处理元素移动
     * @param {Number} index 下标
     * @return {Object} 移动数据
     */
    handleItemMove(index) {
      const { map } = this.matrix;
      let targetIndex = index;
      if (index < this.dragIndex && index >= this.hoverIndex) {
        // 向后补位
        targetIndex = index + 1;
      } else if (index > this.dragIndex && index <= this.hoverIndex) {
        // 向前补位
        targetIndex = index - 1;
      } else if (index === this.dragIndex && this.mouse.state === "endDrag") {
        // 被放置
        targetIndex = this.hoverIndex;
      }
      return {
        order: targetIndex,
        isMove: targetIndex !== index && index !== this.dragIndex,
        moveStyle: {
          transform: `translate(
            ${map[targetIndex].left - map[index].left}px,
            ${map[targetIndex].top - map[index].top}px
          )`,
        },
      };
    },
    /**
     * @description: 获取鼠标指向元素下标
     * @param {Number} x 鼠标x坐标
     * @param {Number} y 鼠标y坐标
     * @param {Boolean} sure 是否一定找到元素
     * @return {Number} 指向的元素下标
     */
    getHoverItemIndex(x, y, sure) {
      const { cols, rows, left, top, toRight, toBottom } = this.matrix;
      const colPos = Math.ceil((x - left) / (this.itemWidth + this.colGap));
      const rowPos = Math.ceil((y - top) / (this.itemHeight + this.rowGap));
      if (sure) {
        const targetIndex =
          Math.max(0, Math.min(rows - 1, rowPos - 1)) * cols +
          Math.max(0, Math.min(cols - 1, colPos - 1));
        return Math.min(targetIndex, this.itemCount - 1);
      } else if (x < left || x > toRight || y < top || y > toBottom) {
        // 鼠标超出矩阵范围
        return -1;
      } else if (
        x - left > (this.itemWidth + this.colGap) * colPos - this.colGap ||
        y - top > (this.itemHeight + this.rowGap) * rowPos - this.rowGap
      ) {
        // 鼠标指向行列间隔处
        return -1;
      } else {
        const targetIndex = (rowPos - 1) * cols + (colPos - 1);
        return targetIndex >= this.itemCount ? -1 : targetIndex;
      }
    },
    /**
     * @description: 鼠标按下
     * @param {event} ev 事件对象
     */
    handleMousedown(ev) {
      if (this.itemCount === 0 || this.mode === "preview") return;
      this.handleItemPlace();
      this.initMatrix();
      this.dragIndex = this.getHoverItemIndex(ev.clientX, ev.clientY);
      if (this.dragIndex !== -1) {
        this.mouse = {
          state: "startDrag",
          startX: ev.clientX,
          startY: ev.clientY,
          moveX: ev.clientX,
          moveY: ev.clientY,
        };
        this.hoverIndex = this.dragIndex;
        this.initItemList();
      }
    },
    /**
     * @description: 鼠标移动
     * @param {event} ev 事件对象
     */
    handleMousemove(ev) {
      if (this.mouse.state !== "startDrag") return;
      window.cancelAnimationFrame(this.mouse.moveFrame);
      this.mouse.moveFrame = window.requestAnimationFrame(() => {
        const hoverIndex = this.getHoverItemIndex(ev.clientX, ev.clientY, true);
        if (hoverIndex !== this.hoverIndex) {
          this.hoverIndex = hoverIndex;
          this.initItemList();
        }
        this.$set(this.mouse, "moveX", ev.clientX);
        this.$set(this.mouse, "moveY", ev.clientY);
      });
    },
    /**
     * @description: 鼠标抬起
     */
    handleMouseup() {
      if (this.mouse.state !== "startDrag") return;
      window.cancelAnimationFrame(this.mouse.moveFrame);
      this.$set(this.mouse, "state", "endDrag");
      this.initItemList();
      this.$refs.items[this.dragIndex].addEventListener(
        "transitionend",
        this.handleItemPlace
      );
    },
    /**
     * @description: 处理放置拖拽元素
     */
    handleItemPlace() {
      if (this.mouse.state !== "endDrag") return;
      let list = [];
      this.itemList.forEach((entity) => {
        list[entity.order] = entity.item;
      });
      this.$refs.items[this.dragIndex].removeEventListener(
        "transitionend",
        this.handleItemPlace
      );
      this.hoverIndex = this.dragIndex = -1;
      this.$emit("input", list);
      this.$set(this.mouse, "state", "noDrag");
    },
    /**
     * @description: 处理点击元素
     * @param {Object} item 数据
     */
    handleClickItem(item) {
      if (this.mode !== "preview") return;
      this.$emit("click-item", item);
    },
  },
};
</script>

<style lang="scss" scoped>
$move-duration: 0.3s; // 元素移动持续时间

.dragCard {
  position: relative;
  user-select: none;
  border: 1px solid black;

  &.is-drag {
    .dragCard_foreground {
      .dragCard_foreground_item {
        cursor: grab;
      }
    }
  }

  &.is-dragging {
    .dragCard_foreground {
      .dragCard_foreground_item {
        &:not(.is-drag) {
          transition: transform $move-duration;
        }
      }
    }
  }

  .dragCard_background,
  .dragCard_foreground {
    display: grid;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .dragCard_background {
    .dragCard_background_item {
      box-sizing: border-box;

      &.is-hover {
        border: 1px solid red;
      }
    }
  }

  .dragCard_foreground {
    position: absolute;
    top: 0;
    left: 0;

    .dragCard_foreground_item {
      border: 1px solid green;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;

      &.is-drag {
        z-index: 1;
        cursor: grabbing;
      }

      &.is-move {
        background-color: green;
      }
    }
  }
}
</style>
