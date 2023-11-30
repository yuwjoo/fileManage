<template>
  <el-dialog
    class="addDialog"
    v-model="visible"
    title="新建分类"
    :close-on-click-modal="false"
    width="30%"
    show-close
    top="30vh"
  >
    <el-form ref="formRef" :model="form" :show-message="false">
      <el-descriptions title="" direction="vertical" :column="2" border>
        <el-descriptions-item>
          <template #label>分类名</template>
          <template #default>
            <el-form-item label="" prop="name" :rules="rules.name">
              <el-input v-model.trim="form.name" placeholder="请输入" clearable />
            </el-form-item>
          </template>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>目录名</template>
          <template #default>
            <el-form-item label="" prop="directory" :rules="rules.directory">
              <el-input v-model.trim="form.directory" placeholder="请输入" clearable />
            </el-form-item>
          </template>
        </el-descriptions-item>
      </el-descriptions>
    </el-form>

    <template #footer>
      <el-button size="default" @click="handleClose">取消</el-button>
      <el-button type="primary" size="default" :loading="loading" @click="submitForm"
        >提交</el-button
      >
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCreateCategoryDialogForm } from '../hooks/createCategoryDialog/createCategoryDialogForm';

const emits = defineEmits<{
  add: [value: any];
}>();

const visible = ref<boolean>(false); // 显示对话框

const { loading, form, formRef, rules, resetForm, submitForm } = useCreateCategoryDialogForm({
  submitSuccess: handleSubmitSuccess
}); // 表单数据

/**
 * @description: 打开对话框
 */
function handleOpen() {
  resetForm();
  visible.value = true;
}

/**
 * @description: 处理关闭
 */
function handleClose() {
  visible.value = false;
}

/**
 * @description: 处理提交完成
 * @param {any} res 返回数据
 */
function handleSubmitSuccess(res: any) {
  emits('add', res);
  handleClose();
}

defineExpose({
  open: handleOpen
});
</script>
