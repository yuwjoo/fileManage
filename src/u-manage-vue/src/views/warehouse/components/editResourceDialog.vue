<template>
  <el-dialog v-model="visible" title="新建资源" :close-on-click-modal="false" show-close>
    <el-form
      ref="formRef"
      label-suffix=":"
      :label-width="80"
      :model="form"
      :rules="rules"
      :disabled="disabled"
    >
      <el-form-item label="加入分类" prop="categoryId">
        <el-radio-group v-model="form.categoryId">
          <el-radio-button
            v-for="(item, index) in select.category.list"
            :key="index"
            :label="item.name"
          />
        </el-radio-group>
        <el-popover v-if="!disabled" placement="top-start" :width="240" trigger="hover">
          <template #reference>
            <el-icon style="margin-left: 4px" :size="12">
              <i-el-warning />
            </el-icon>
          </template>
          <template #default>
            没有想要的分类？<el-link type="primary" @click="emits('create-category')">点我</el-link
            >快速新建
          </template>
        </el-popover>
      </el-form-item>
      <el-form-item label="资源名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入" :maxlength="100" clearable />
      </el-form-item>
      <el-form-item label="资源描述" prop="describe">
        <el-input
          v-model="form.describe"
          type="textarea"
          :autosize="{ minRows: 4 }"
          resize="none"
          placeholder="请输入"
          :maxlength="500"
          clearable
        />
      </el-form-item>
      <el-form-item label="资源标签" prop="tags">
        <div class="tag_group">
          <el-tag
            class="tag_group_tag"
            v-for="tag in form.tagList"
            :key="tag"
            :closable="!disabled"
            :disable-transitions="false"
            @close="handleDeleteTag(form.tagList, tag)"
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
              @keyup.enter="handleInputConfirm(form.tagList, false)"
              @blur="handleInputConfirm(form.tagList, true)"
            />
            <el-button
              class="tag_group_tag tag_group_add"
              v-else
              size="small"
              @click="handleEntryAdd"
              >+ 新建</el-button
            >
          </template>
        </div>
      </el-form-item>
      <el-form-item label="资源文件" prop="describe">
        <el-upload
          class="fileList"
          v-model:file-list="form.resourceList"
          drag
          :disabled="disabled"
          :show-file-list="false"
          :http-request="handleHttpRequest"
        >
          <el-table
            :data="form.resourceList"
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
                  @click.stop="handleDelete(form.resourceList, $index)"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-upload>
      </el-form-item>
      <el-form-item label="说明文档" prop="describe">
        <el-upload
          class="fileList"
          v-model:file-list="form.readmeList"
          drag
          :disabled="disabled"
          :show-file-list="false"
          :http-request="handleHttpRequest"
        >
          <el-table
            :data="form.readmeList"
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
                  @click.stop="handleDelete(form.readmeList, $index)"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-upload>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button size="default" @click="close">取消</el-button>
      <el-button type="primary" size="default" @click="handleSubmit">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Delete, Document } from '@element-plus/icons-vue';
import { useEditResourceDialogForm } from '../hooks/editResourceDialogForm';
import { useEditResourceDialogFileList } from '../hooks/editResourceDialogFileList';
import { useEditResourceDialogTagGroup } from '../hooks/editResourceDialogTagGroup';
import { useOpenDialog } from '../hooks/openDialog';
import { useWarehouseSelect } from '../hooks/warehouseSelect';

const emits = defineEmits<{
  'create-category': [];
}>();

const visible = ref<boolean>(false); // 显示对话框
const { form, rules, disabled, formRef, handleSubmit } = useEditResourceDialogForm(); // 表单数据
const { handleDelete, handleHttpRequest } = useEditResourceDialogFileList(); // 上传文件列表
const { isAdd, inputValue, InputRef, handleDeleteTag, handleInputConfirm, handleEntryAdd } =
  useEditResourceDialogTagGroup(); // 标签组
const { editResourceOpen } = useOpenDialog(); // 打开对话框函数
const { select, getCategoryList } = useWarehouseSelect(); // 下拉数据

/**
 * @description: 打开对话框
 */
function open() {
  form.value = {
    categoryId: '',
    name: '',
    describe: '',
    tagList: [],
    resourceList: [],
    readmeList: []
  };
  getCategoryList();
  visible.value = true;
}

/**
 * @description: 关闭对话框
 */
function close() {
  visible.value = false;
}

editResourceOpen.value = open;

defineExpose({
  open
});
</script>

<style lang="scss">
.edit_resource_dialog {
  .edit_resource_dialog_space {
    width: 100%;

    .edit_resource_dialog_space_form {
      .edit_resource_dialog_space_form_item {
        .edit_resource_dialog_space_form_item_upload,
        .el-select {
          width: 100%;
        }
      }
    }
  }
}

.fileList {
  --el-upload-dragger-padding-horizontal: 10px;
  width: 100%;
}

.tag_group {
  .tag_group_tag {
    margin: 0 5px 5px 0;
  }

  .tag_group_add {
    width: 80px;
  }
}
</style>
