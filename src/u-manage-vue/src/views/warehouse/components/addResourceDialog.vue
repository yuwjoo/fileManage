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
          <el-radio-button v-for="(item, index) in categoryList" :key="index" :label="item.name" />
        </el-radio-group>
        <el-popover v-if="!disabled" placement="top-start" :width="240" trigger="hover">
          <template #reference>
            <el-icon style="margin-left: 4px" :size="12">
              <i-el-warning />
            </el-icon>
          </template>
          <template #default>
            没有想要的分类？<el-link type="primary" @click="() => createCategoryDialogRef!.open()"
              >点我</el-link
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
        <tag-group v-model="form.tagList" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="资源文件" prop="describe">
        <file-list v-model="form.resourceList" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="说明文档" prop="describe">
        <file-list v-model="form.readmeList" :disabled="disabled" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button size="default" @click="handleClose">取消</el-button>
      <el-button type="primary" size="default" @click="handleSubmit">提交</el-button>
    </template>
  </el-dialog>

  <!-- 新建分类对话框 start -->
  <create-category-dialog ref="createCategoryDialogRef" />
  <!-- 新建分类对话框 end -->
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue';
import tagGroup from './components/tagGroup.vue';
import fileList from './components/fileList.vue';
import createCategoryDialog from './components/createCategoryDialog.vue';
import { useDialogStore } from '@/stores/dialog';
import { selectCategoryList } from '@/api/home';
import type { UploadUserFile, FormRules } from 'element-plus';

interface Form {
  categoryId: string; // 分类id
  name: string; // 名称
  describe: string; // 描述
  tagList: string[]; // 标签列表
  resourceList: UploadUserFile[]; // 资源文件列表
  readmeList: UploadUserFile[]; // 说明文档列表
}

const { visible } = toRefs(useDialogStore().addResource); // 对话框 store
const disabled = ref<boolean>(false); // 页面是否禁用
const categoryList = ref<any[]>([]); // 分类列表
const createCategoryDialogRef = ref<InstanceType<typeof createCategoryDialog>>(); // 创建分类对话框 ref
const formRef = ref<any>(null); // 表单ref
const form = ref<Form>({
  categoryId: '',
  name: '',
  describe: '',
  tagList: [],
  resourceList: [],
  readmeList: []
});
const rules = reactive<FormRules<Form>>({
  resourceList: [
    {
      validator: (_rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error('请添加文件'));
        } else {
          callback();
        }
      },
      trigger: 'change'
    }
  ],
  categoryId: [{ required: true, message: '请选择或输入分类', trigger: 'change' }],
  name: [{ required: true, message: '请输入名称', trigger: 'change' }]
});

/**
 * @description: 获取分类列表数据
 */
function getCategoryList() {
  selectCategoryList().then((res) => {
    categoryList.value = res || [];
  });
}

/**
 * @description: 打开对话框
 */
function open(): void {
  form.value = {
    categoryId: '',
    name: '',
    describe: '',
    tagList: [],
    resourceList: [],
    readmeList: []
  };
  formRef.value?.resetFields();
  visible.value = true;
}

/**
 * @description: 处理关闭
 */
function handleClose(): void {
  visible.value = false;
}

/**
 * @description: 处理提交
 */
function handleSubmit(): void {}

getCategoryList();
</script>

<style lang="scss">
.add_resource_dialog {
  .add_resource_dialog_space {
    width: 100%;

    .add_resource_dialog_space_form {
      .add_resource_dialog_space_form_item {
        .add_resource_dialog_space_form_item_upload,
        .el-select {
          width: 100%;
        }
      }
    }
  }
}
</style>
