<template>
  <el-container class="layout">
    <el-header class="layout_header" height="40px">
      <layout-content />
    </el-header>
    <el-main class="layout_main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import layoutContent from './components/layoutContent.vue';

defineOptions({ name: 'layout' });
</script>

<style lang="scss">
.layout {
  .layout_header {
    padding: 0;
  }
}
</style>
