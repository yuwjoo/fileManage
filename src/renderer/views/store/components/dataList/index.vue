<template>
  <div class="dataList">
    <div class="dataList_item" v-for="(item, index) in list" :key="index">
      <data-list-item :item="item" @edit="$emit('edit', $event)" />
    </div>
  </div>
</template>

<script>
import dataListItem from "./components/dataListItem";

export default {
  props: {
    // 列表数据
    list: {
      type: Array,
      required: true,
    },
  },
  components: {
    dataListItem,
  },
};
</script>

<style lang="scss" scoped>
.dataList {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;

  .dataList_item {
    width: calc(100% / 3 - 20px);
    padding: 10px;
  }
}
</style>
