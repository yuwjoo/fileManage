<template>
  <div class="fileList">
    <div class="fileList_item" v-for="(item, index) in list" :key="index">
      <slot :item="item"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.fileList {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;

  .fileList_item {
    width: calc(100% / 4 - 20px);
    padding: 10px;
  }
}
</style>
