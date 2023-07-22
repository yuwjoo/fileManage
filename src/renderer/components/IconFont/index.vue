<!--
 * @FileName: 
 * @FilePath: \fileManage\src\renderer\components\IconFont\index.vue
 * @Author: YH
 * @Date: 2023-07-08 09:04:26
 * @LastEditors: YH
 * @LastEditTime: 2023-07-20 15:33:04
 * @Description: 图标组件
-->
<template>
  <span class="iconFont" @click="$emit('click', $event)">
    <i v-if="isFontIcon" :class="icon" :style="currentIconStyle" />
    <svg
      v-else
      class="iconFont_svg"
      aria-hidden="true"
      :style="currentIconStyle"
    >
      <use :xlink:href="isHrefIcon ? icon : `#${icon}`" />
    </svg>
  </span>
</template>

<script>
export default {
  name: "iconFont",
  props: {
    // 图标
    icon: {
      type: String,
      required: true,
    },
    // 大小
    size: {
      type: String,
    },
    // 颜色
    color: {
      type: String,
    },
  },
  computed: {
    // 是字体图标
    isFontIcon() {
      return /^el-icon-/i.test(this.icon);
    },
    // 是远程链接
    isHrefIcon() {
      return /^(http|https):\/\//i.test(this.icon);
    },
    // 图标样式
    currentIconStyle() {
      return {
        fontSize: this.size,
        color: this.color,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.iconFont {
  display: inline-block;

  .iconFont_svg {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
  }
}
</style>
