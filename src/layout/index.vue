<template>
  <div class="layout">
    <el-container>
      <el-header>
        <header-content />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import headerContent from "./components/headerContent.vue";

export default {
  components: {
    headerContent,
  },
};
</script>
