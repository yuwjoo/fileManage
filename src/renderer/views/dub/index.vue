<!--
 * @FileName: views.dub
 * @FilePath: \fileManage\src\renderer\views\dub\index.vue
 * @Author: YH
 * @Date: 2023-10-10 15:05:18
 * @LastEditors: YH
 * @LastEditTime: 2023-10-26 17:39:30
 * @Description: 配音模块
-->
<template>
  <div class="dub">
    <drag-card class="dragCard" v-model="list" />
  </div>
</template>

<script>
import dragCard from "./components/dragCard";

export default {
  name: "dub",
  data() {
    return {
      list: Array.from({ length: 10 }).map((_, index) => ({
        icon: "",
        value: index,
      })),
    };
  },
  components: {
    dragCard,
  },
};
</script>

<style lang="scss" scoped>
.dragCard {
  margin: 50px;
}
</style>
