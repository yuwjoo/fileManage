<template>
  <el-dialog
    class="edit-category-dialog"
    v-model="visible"
    title="管理分类"
    width="500px"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <el-form
      v-loading="loading"
      class="edit-category-dialog__form"
      ref="formRef"
      :model="list"
      :show-message="false"
    >
      <el-table ref="tableRef" :data="list" border stripe max-height="500px">
        <el-table-column prop="name" label="分类名" min-width="120" align="center">
          <template #default="{ $index, row }">
            <el-form-item
              class="edit-category-dialog__form-item"
              v-if="row.status.isEdit"
              :prop="`[${$index}].name`"
              :rules="rules.name"
            >
              <el-input v-model.trim="row.name" placeholder="请输入" clearable />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="directory" label="目录名" min-width="120" align="center">
          <template #default="{ $index, row }">
            <el-form-item
              class="edit-category-dialog__form-item"
              v-if="row.status.isEdit"
              :prop="`[${$index}].directory`"
              :rules="rules.directory"
            >
              <el-input v-model.trim="row.directory" placeholder="请输入" clearable />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="option" label="操作" width="100" align="center">
          <template #default="{ $index, row }">
            <el-button
              v-if="row.status.isEdit"
              type="success"
              :icon="Check"
              circle
              :loading="row.status.loading === 'save'"
              :disabled="row.status.loading !== 'no'"
              title="保存"
              @click="handleSaveRow(row, $index)"
            />
            <el-button
              v-else
              type="warning"
              :icon="Edit"
              circle
              :disabled="row.status.loading !== 'no'"
              title="编辑"
              @click="handleEditRow(row)"
            />
            <el-button
              type="danger"
              :icon="Delete"
              circle
              :loading="row.status.loading === 'delete'"
              :disabled="row.status.loading !== 'no'"
              title="删除"
              @click="handleDeleteRow(row, $index)"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-button class="edit-category-dialog__form-add" :icon="Plus" @click="handleAddRow"
        >新建</el-button
      >
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Delete, Edit, Check, Plus } from '@element-plus/icons-vue';
import { useEditCategoryDialogTable } from '../hooks/editCategoryDialog/editCategoryDialogTable';
import { useEditCategoryDialogOpen } from '../hooks/editCategoryDialog/editCategoryDialogOpen';

const visible = ref<boolean>(false); // 显示对话框

const {
  list,
  loading,
  rules,
  formRef,
  tableRef,
  getData,
  handleAddRow,
  handleSaveRow,
  handleDeleteRow,
  handleEditRow
} = useEditCategoryDialogTable(); // 表格数据

useEditCategoryDialogOpen(handleOpen); // 设置对话框打开函数

/**
 * @description: 打开对话框
 */
function handleOpen() {
  getData();
  visible.value = true;
}

/**
 * @description: 关闭对话框
 */
function handleClose() {
  visible.value = false;
}

defineExpose({
  open: handleOpen
});
</script>

<style lang="scss">
.edit-category-dialog {
  .edit-category-dialog__form {
    .edit-category-dialog__form-item {
      margin-bottom: 0;
    }

    .edit-category-dialog__form-add {
      margin-top: 10px;
      width: 100%;
      padding: 8px 0;
      height: auto;
    }
  }
}
</style>
