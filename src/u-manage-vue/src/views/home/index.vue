<template>
  <div>
    home页
    <aa />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

defineOptions({ name: 'home' });

const aa = defineAsyncComponent(() => import('~icons/iconfont/close'));
</script>