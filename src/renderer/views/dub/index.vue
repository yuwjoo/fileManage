<!--
 * @FileName: views.dub
 * @FilePath: \fileManage\src\renderer\views\dub\index.vue
 * @Author: YH
 * @Date: 2023-10-10 15:05:18
 * @LastEditors: YH
 * @LastEditTime: 2023-10-13 17:26:11
 * @Description: 配音模块
-->
<template>
  <div class="dub">
    <drag-card>
      <darg-card-item />
    </drag-card>
  </div>
</template>

<script>
import dragCard from "./components/dragCard";
import dargCardItem from "./components/dragCard/dargCardItem";

export default {
  name: "dub",
  components: {
    dragCard,
    dargCardItem,
  },
};
</script>
