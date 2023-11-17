<template>
  <el-upload
    class="fileList"
    :file-list="modelValue"
    drag
    :disabled="disabled"
    :show-file-list="false"
    :http-request="handleHttpRequest"
    @update:fileList="emits('update:modelValue', $event)"
  >
    <el-table
      :data="modelValue"
      :show-header="false"
      :empty-text="disabled ? '暂无数据' : '拖拽文件或者点击添加'"
    >
      <el-table-column label="文件名" prop="file">
        <template v-slot:default="{ row }">
          <el-link :icon="Document" @click.stop>{{ row.name }}</el-link>
        </template>
      </el-table-column>
      <el-table-column v-if="!disabled" label="操作" width="80px" align="right">
        <template v-slot:default="{ $index }">
          <el-button
            type="danger"
            :icon="Delete"
            circle
            title="删除"
            @click.stop="handleDelete($index)"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-upload>
</template>

<script setup lang="ts">
import type { UploadRequestOptions, UploadUserFile } from 'element-plus';
import { Delete, Document } from '@element-plus/icons-vue';

interface PropsType {
  modelValue: UploadUserFile[]; // 文件列表
  disabled: boolean; // 是否禁用
}

const props = withDefaults(defineProps<PropsType>(), {});
const emits = defineEmits<{
  'update:modelValue': [val: PropsType['modelValue']];
}>();

/**
 * @description: 处理删除
 * @param {number} index 下标
 */
function handleDelete(index: number): void {
  emits(
    'update:modelValue',
    props.modelValue.filter((_v, i) => i !== index)
  );
}

/**
 * @description: 自定义上传文件逻辑
 * @param {UploadRequestOptions} option 配置
 */
function handleHttpRequest(option: UploadRequestOptions): Promise<void> {
  option.onSuccess((option.file as any).path || option.file.name);
  return Promise.resolve();
}
</script>

<style lang="scss">
.fileList {
  --el-upload-dragger-padding-horizontal: 10px;
  width: 100%;
}
</style>
