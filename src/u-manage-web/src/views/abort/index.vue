<template>
  <div class="abort">
    <div class="abort_header"></div>
    <el-button type="primary" @click="test">回去</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
function test() {
  router.push({ name: "home" });
}
</script>

<style lang="scss">
.abort {
  padding: 0 20px 20px;
  .abort_header {
    -webkit-app-region: drag;
    height: 40px;
  }
}
</style>
