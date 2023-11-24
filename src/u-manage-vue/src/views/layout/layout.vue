<template>
  <el-container class="layout">
    <el-header class="layout-header" height="40px">
      <header-content />
    </el-header>
    <el-main class="layout-main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import headerContent from './components/headerContent.vue';
</script>

<style lang="scss">
.layout-header {
  padding: 0;
}
</style>
