<template>
  <el-dialog
    class="manage_category_dialog"
    v-model="visible"
    title="管理分类"
    width="500px"
    :close-on-click-modal="false"
    :before-close="close"
  >
    <el-form
      class="manage_category_dialog_form"
      ref="formRef"
      :model="tableList"
      :show-message="false"
    >
      <el-table :data="tableList" border stripe style="width: 100%">
        <el-table-column prop="name" label="分类名" min-width="120" align="center">
          <template #default="{ $index, row }">
            <el-form-item
              class="manage_category_dialog_form_item"
              v-if="row._isEdit"
              :prop="`[${$index}].name`"
              :rules="rules.name"
            >
              <el-input v-model.trim="row.name" placeholder="请输入" clearable />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="directory" label="目录" min-width="120" align="center">
          <template #default="{ $index, row }">
            <el-form-item
              class="manage_category_dialog_form_item"
              v-if="row._isEdit"
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
              v-if="row._isEdit"
              type="success"
              :icon="Check"
              circle
              :loading="row._loading === 'save'"
              :disabled="row._loading !== 'no'"
              title="保存"
              @click="handleSave(row)"
            />
            <el-button
              v-else
              type="warning"
              :icon="Edit"
              circle
              :disabled="row._loading !== 'no'"
              title="编辑"
              @click="handleEdit(row)"
            />
            <el-button
              v-if="row.id"
              type="danger"
              :icon="Delete"
              circle
              :loading="row._loading === 'delete'"
              :disabled="row._loading !== 'no'"
              title="删除"
              @click="handleDelete(row, $index)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { useDialogStore } from '@/stores/dialog';
import { ref, toRefs } from 'vue';
import { Delete, Edit, Check } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useSelectStore } from '@/stores/select';

interface TableData {
  [key: string]: any;
  _isEdit: boolean;
  _loading: 'save' | 'delete' | 'no';
}

defineOptions({ name: 'ManageCategoryDialog' });

const { manageCategory } = useDialogStore(); // 对话框 store
const { category } = useSelectStore(); // 下拉列表 store
const { visible, close } = toRefs(manageCategory);
const tableList = ref<TableData[]>(
  category.list.map((item) => {
    return { _isEdit: false, _loading: 'no', ...item };
  })
); // 表格数据
const rules: FormRules<TableData> = {
  name: [{ required: true, message: '请输入分类名', trigger: 'change' }],
  directory: [{ required: true, message: '请输入目录', trigger: 'change' }]
}; // 表单校验规则
const formRef = ref<FormInstance>(); // 表单 ref

/**
 * @description: 处理保存
 * @param {TableData} row 当前数据
 */
function handleSave(row: TableData) {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log(row);
      row._loading = 'save';
      setTimeout(() => {
        row._loading = 'no';
        row._isEdit = false;
      }, 2000);
    }
  });
}

/**
 * @description: 处理删除
 * @param {TableData} row 当前数据
 */
function handleDelete(row: TableData, index: number) {
  console.log(row);
  row._loading = 'delete';
  setTimeout(() => {
    row._loading = 'no';
    tableList.value.splice(index, 1);
  }, 2000);
}

/**
 * @description: 处理编辑
 * @param {TableData} row 当前数据
 */
function handleEdit(row: TableData) {
  console.log(row);
  row._isEdit = true;
}
</script>

<style lang="scss">
.manage_category_dialog {
  .manage_category_dialog_form {
    .manage_category_dialog_form_item {
      margin-bottom: 0;
    }
  }
}
</style>
