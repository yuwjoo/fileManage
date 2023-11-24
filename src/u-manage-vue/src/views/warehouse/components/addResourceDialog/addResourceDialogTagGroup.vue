<template>
  <div class="tag_group">
    <el-tag
      class="tag_group_tag"
      v-for="tag in modelValue"
      :key="tag"
      :closable="!disabled"
      :disable-transitions="false"
      @close="handleDeleteTag(tag)"
    >
      {{ tag }}
    </el-tag>
    <template v-if="!disabled">
      <el-input
        v-if="isAdd"
        class="tag_group_tag tag_group_add"
        ref="InputRef"
        v-model="inputValue"
        size="small"
        maxlength="20"
        @keyup.enter="handleInputConfirm(false)"
        @blur="handleInputConfirm(true)"
      />
      <el-button class="tag_group_tag tag_group_add" v-else size="small" @click="handleEntryAdd"
        >+ 新建</el-button
      >
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ElInput } from 'element-plus';
import { nextTick, ref } from 'vue';

interface PropsType {
  modelValue: string[]; // 文件列表
  disabled: boolean; // 是否禁用
}

defineOptions({ name: 'tagGroup' });

const props = withDefaults(defineProps<PropsType>(), {});
const emits = defineEmits<{
  'update:modelValue': [val: PropsType['modelValue']];
}>();
const isAdd = ref<boolean>(false); // 新增模式
const inputValue = ref<string>(''); // 输入框绑定值
const InputRef = ref<InstanceType<typeof ElInput>>(); // 输入框 ref

/**
 * @description: 处理标签删除
 * @param {string} tag 标签名
 */
function handleDeleteTag(tag: string) {
  emits(
    'update:modelValue',
    props.modelValue.filter((v) => v !== tag)
  );
}

/**
 * @description: 处理输入完成
 * @param {boolean} isBlur 是否失去焦点
 */
function handleInputConfirm(isBlur: boolean) {
  if (inputValue.value) {
    emits('update:modelValue', [...props.modelValue, inputValue.value]);
  }
  isAdd.value = !isBlur;
  inputValue.value = '';
}

/**
 * @description: 进入编辑模式
 */
function handleEntryAdd() {
  isAdd.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
}
</script>

<style lang="scss">
.tag_group {
  .tag_group_tag {
    margin: 0 5px 5px 0;
  }

  .tag_group_add {
    width: 80px;
  }
}
</style>
