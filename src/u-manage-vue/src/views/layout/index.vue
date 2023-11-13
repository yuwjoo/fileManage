<template>
  <el-container class="layout">
    <el-header class="layout_header" height="40px">
      <header-content />
    </el-header>
    <el-main class="layout_main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </el-main>
  </el-container>

  <!-- 管理分类对话框 start -->
  <manage-category-dialog />
  <!-- 管理分类对话框 end -->
</template>

<script setup lang="ts">
import headerContent from './components/headerContent.vue';

defineOptions({ name: 'layout' });
</script>

<style lang="scss">
.layout {
  .layout_header {
    padding: 0;
  }
}
</style>
