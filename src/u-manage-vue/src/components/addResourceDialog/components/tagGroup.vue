<template>
  <div class="tag_group">
    <el-tag
      v-for="tag in value"
      :key="tag"
      closable
      :disable-transitions="false"
      @close="handleClose2(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="ml-1 w-20"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
      + New Tag
    </el-button>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'tagGroup' });

const props = withDefaults(
  defineProps<{
    value: string[];
  }>(),
  {}
);
</script>
