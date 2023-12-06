<template>
  <el-dialog
    class="edit-category-dialog"
    v-model="visible"
    title="管理分类"
    width="500px"
    :close-on-click-modal="false"
    @close="handleClose(emits)"
  >
    <el-form
      v-loading="loading"
      class="edit-category-dialog__form"
      ref="formRef"
      :model="tableData"
      :show-message="false"
    >
      <el-table ref="tableRef" :data="tableData" border stripe max-height="500px">
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
            <el-popconfirm
              v-if="row.id"
              title="确定删除吗?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleDeleteRow(row, $index)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  :icon="Delete"
                  circle
                  :loading="row.status.loading === 'delete'"
                  :disabled="row.status.loading !== 'no'"
                  title="删除"
                />
              </template>
            </el-popconfirm>

            <el-button
              v-else
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
import { Delete, Edit, Check, Plus } from '@element-plus/icons-vue';
import { useEditCategoryDialog } from '../hooks/editCategoryDialog';
import { useEditCategoryDialogTable } from '../hooks/editCategoryDialogTable';
import type { PropType } from 'vue';
import type { UseWarehouseSelectReturn } from '../types/warehouseSelect';

const props = defineProps({
  // 分类数据
  category: {
    type: Object as PropType<UseWarehouseSelectReturn['category']>,
    required: true
  }
});

const emits = defineEmits<{
  change: []; // 数据改变
}>();

const { visible, handleOpen, handleClose } = useEditCategoryDialog(); // 对话框

const {
  tableData,
  loading,
  rules,
  formRef,
  tableRef,
  setTableData,
  handleAddRow,
  handleSaveRow,
  handleDeleteRow,
  handleEditRow
} = useEditCategoryDialogTable(); // 表格数据

defineExpose({
  open: () => handleOpen({ setTableData }, props.category)
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
