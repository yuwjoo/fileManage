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
      <el-table ref="tableRef" :data="tableList" border stripe max-height="500px">
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
        <el-table-column prop="directory" label="目录名" min-width="120" align="center">
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
              @click="handleSave(row, $index)"
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
      <el-button class="manage_category_dialog_form_addbtn" :icon="Plus" @click="handleAdd"
        >新建</el-button
      >
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { useDialogStore } from '@/stores/dialog';
import { ref, toRefs, nextTick, watch, toRaw } from 'vue';
import { Delete, Edit, Check, Plus } from '@element-plus/icons-vue';
import type { FormInstance, FormRules, TableInstance } from 'element-plus';
import { useSelectStore } from '@/stores/select';
import { saveCategoryData, deleteCategoryData } from '@/api/home';

interface TableData {
  [key: string]: any;
  _isEdit: boolean;
  _loading: 'save' | 'delete' | 'no';
}

defineOptions({ name: 'ManageCategoryDialog' });

const { visible, close } = toRefs(useDialogStore().manageCategory); // 对话框 store
const { category, getCategoryList } = useSelectStore(); // 下拉列表 store
const tableList = ref<TableData[]>([]); // 表格数据
const rules: FormRules<TableData> = {
  name: [{ required: true, message: '请输入分类名', trigger: 'change' }],
  directory: [{ required: true, message: '请输入目录', trigger: 'change' }]
}; // 表单校验规则
const formRef = ref<FormInstance>(); // 表单 ref
const tableRef = ref<TableInstance>(); // 表格 ref

watch(visible, (val) => {
  if (val) {
    tableList.value = category.list.map((item) => ({ _isEdit: false, _loading: 'no', ...item }));
  } else {
    getCategoryList();
  }
});

/**
 * @description: 处理新建
 */
function handleAdd() {
  tableList.value.push({ _isEdit: true, _loading: 'no' });
  nextTick(() => tableRef.value!.setScrollTop(9999));
}

/**
 * @description: 处理保存
 * @param {TableData} row 当前数据
 * @param {number} index 数据下标
 */
function handleSave(row: TableData, index: number) {
  formRef.value?.validateField([`[${index}].name`, `[${index}].directory`], (valid) => {
    if (valid) {
      console.log(toRaw(row));
      row._loading = 'save';
      saveCategoryData(toRaw(row))
        .then((res) => {
          console.log(res);
        })
        .finally(() => {
          row._loading = 'no';
          row._isEdit = false;
        });
    }
  });
}

/**
 * @description: 处理删除
 * @param {TableData} row 当前数据
 * @param {number} index 数据下标
 */
function handleDelete(row: TableData, index: number) {
  console.log(row);
  if (row.id) {
    row._loading = 'delete';
    deleteCategoryData(toRaw(row))
      .then((res) => {
        console.log(res);
      })
      .finally(() => {
        row._loading = 'no';
        tableList.value.splice(index, 1);
      });
  } else {
    tableList.value.splice(index, 1);
  }
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

    .manage_category_dialog_form_addbtn {
      margin-top: 10px;
      width: 100%;
      padding: 8px 0;
      height: auto;
    }
  }
}
</style>
