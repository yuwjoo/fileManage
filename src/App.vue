<template>
  <div class="app">
    <span class="app_text">883ewrwe8 {{ message }}</span>
  </div>
</template>

<script>
import aa from "@/assets/aa.png";
export default {
  data() {
    return {
      message: "消息",
      obj: {},
    };
  },
  created() {
    console.log(this.obj?.aa?.bb);
  },
};
</script>

<style lang="scss" scoped>
.app {
  color: green;
  .app_text {
    color: red;
  }
}
</style>
