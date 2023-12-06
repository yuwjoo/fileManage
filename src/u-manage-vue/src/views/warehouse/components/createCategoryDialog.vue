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
      <el-button
        type="primary"
        size="default"
        :loading="submitLoading"
        @click="handleSubmitForm(emits, { handleClose })"
        >提交</el-button
      >
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useCreateCategoryDialog } from '../hooks/createCategoryDialog';
import { useCreateCategoryDialogForm } from '../hooks/createCategoryDialogForm';

const emits = defineEmits<{
  change: [value: any]; // 数据改变
}>();

const { visible, handleOpen, handleClose } = useCreateCategoryDialog(); // 对话框
const { submitLoading, form, formRef, rules, handleResetForm, handleSubmitForm } =
  useCreateCategoryDialogForm(); // 表单数据

defineExpose({
  open: () => handleOpen({ handleResetForm })
});
</script>
