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
  name: "dataList",
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
  margin-top: 5px;

  .dataList_item {
    width: calc(100% / 1 - 20px);
    padding: 10px;
  }
}

@media screen and (min-width: 700px) and (max-width: 999px) {
  .dataList {
    .dataList_item {
      width: calc(100% / 2 - 20px);
    }
  }
}

@media screen and (min-width: 1000px) and (max-width: 1299px) {
  .dataList {
    .dataList_item {
      width: calc(100% / 3 - 20px);
    }
  }
}

@media screen and (min-width: 1300px) and (max-width: 1699px) {
  .dataList {
    .dataList_item {
      width: calc(100% / 4 - 20px);
    }
  }
}

@media screen and (min-width: 1700px) {
  .dataList {
    .dataList_item {
      width: calc(100% / 5 - 20px);
    }
  }
}
</style>
