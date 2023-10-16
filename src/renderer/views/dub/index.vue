<!--
 * @FileName: views.dub
 * @FilePath: \fileManage\src\renderer\views\dub\index.vue
 * @Author: YH
 * @Date: 2023-10-10 15:05:18
 * @LastEditors: YH
 * @LastEditTime: 2023-10-16 15:14:19
 * @Description: 配音模块
-->
<template>
  <div class="dub">
    <drag-card v-model="list" />
  </div>
</template>

<script>
import dragCard from "./components/dragCard";

export default {
  name: "dub",
  data() {
    return {
      list: [
        { icon: "", value: 66 },
        { icon: "", value: 77 },
        { icon: "", value: 88 },
        { icon: "", value: 99 },
      ],
    };
  },
  components: {
    dragCard,
  },
};
</script>
