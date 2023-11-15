<template>
  <el-dialog
    class="addDialog"
    v-model="visible"
    title="新建资源"
    :close-on-click-modal="false"
    show-close
  >
    <el-space class="addDialog_space" direction="vertical" fill>
      <el-steps :space="200" :active="step" simple finish-status="success">
        <el-step title="基本信息" icon="DocumentAdd" />
        <el-step title="资源文件" icon="DocumentAdd" />
        <el-step title="说明文件" icon="DocumentAdd" />
        <el-step title="完善信息" icon="EditPen" />
      </el-steps>

      <el-form
        class="addDialog_space_form"
        ref="formRef"
        label-suffix=":"
        :model="form"
        :rules="rules"
      >
        <div v-if="step === 0">
          <el-form-item class="addDialog_space_form_item" prop="fileList">
            <el-upload
              class="addDialog_space_form_item_upload"
              v-model:file-list="form.fileList"
              drag
              action=""
              multiple
              :http-request="handleHttpRequest"
            >
              <el-icon class="el-icon--upload"><i-el-upload-filled /></el-icon>
              <div class="el-upload__text">拖拽文件或者 <em>点击添加</em></div>
            </el-upload>
          </el-form-item>
        </div>
        <div v-else-if="step === 1">
          <el-form-item
            class="addDialog_space_form_item"
            label="加入分类"
            prop="categoryId"
            :label-width="80"
          >
            <el-radio-group v-model="form.categoryId">
              <el-radio-button label="工具" />
              <el-radio-button label="文档" />
              <el-radio-button label="其他" />
            </el-radio-group>
            <el-popover placement="top-start" :width="240" trigger="hover">
              <template #reference>
                <el-icon style="margin-left: 4px" :size="12">
                  <i-el-warning />
                </el-icon>
              </template>
              <template #default>
                没有想要的分类？<el-link type="primary">点我</el-link>快速创建
              </template>
            </el-popover>
          </el-form-item>
          <el-form-item
            class="addDialog_space_form_item"
            label="资源名称"
            prop="name"
            :label-width="80"
          >
            <el-input
              v-model="form.name"
              placeholder="请输入"
              :maxlength="1000"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            class="addDialog_space_form_item"
            label="资源描述"
            prop="describe"
            :label-width="80"
          >
            <el-input
              v-model="form.describe"
              type="textarea"
              :autosize="{ minRows: 4 }"
              resize="none"
              placeholder="请输入"
              :maxlength="1000"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            class="addDialog_space_form_item"
            label="资源标签"
            prop="tags"
            :label-width="80"
          >
            <el-tag
              v-for="tag in dynamicTags"
              :key="tag"
              class="mx-1"
              closable
              :disable-transitions="false"
              @close="handleClose2(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              ref="InputRef"
              v-model="inputValue"
              class="ml-1 w-20"
              size="small"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
              + New Tag
            </el-button>
          </el-form-item>
          <el-form-item
            class="addDialog_space_form_item"
            label="资源文件"
            prop="describe"
            :label-width="80"
          >
            <el-upload drag style="width: 100%">
              <el-table :data="[{ file: '工具.jpg' }, { file: 'index.html' }]">
                <el-table-column label="文件名" prop="file"></el-table-column>
                <el-table-column label="操作" width="80px"></el-table-column>
              </el-table>
            </el-upload>
          </el-form-item>
        </div>
        <div v-else-if="step === 2">
          <el-descriptions title="" border direction="vertical">
            <el-descriptions-item label="名称">{{ form.name }}</el-descriptions-item>
            <el-descriptions-item label="分类" :span="10">{{
              form.categoryId
            }}</el-descriptions-item>
            <el-descriptions-item label="标签" :span="3">
              <el-tag size="small" v-for="(tag, index) in form.tags" :key="index">{{ tag }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="描述">{{ form.describe }} </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-form>
    </el-space>

    <template #footer>
      <el-button v-if="step > 0" size="default" @click="handleChangeStep(-1)">上一步</el-button>
      <el-button v-else size="default" @click="handleClose">取消</el-button>
      <el-button v-if="step < 3" type="primary" size="default" @click="handleChangeStep(1)"
        >下一步</el-button
      >
      <el-button v-else type="primary" size="default" @click="handleSubmit">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue';
import type {
  UploadUserFile,
  UploadRequestOptions,
  FormValidateCallback,
  FormRules
} from 'element-plus';
import { useDialogStore } from '@/stores/dialog';

interface Form {
  fileList: UploadUserFile[];
  name: string;
  describe: string;
  tags: string[];
  categoryId: string;
}

const { visible, close } = toRefs(useDialogStore().addResource); // 对话框 store
const step = ref<number>(0); // 当前步骤
const formRef = ref<any>(null); // 表单ref
const form = reactive<Form>({
  fileList: [], // 文件列表
  name: '', // 名称
  describe: '', // 描述
  tags: [], // 标签列表
  categoryId: '' // 分类id
});
const rules = reactive<FormRules<Form>>({
  fileList: [
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
}); // 校验规则

const inputValue = ref('');
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3']);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();

function handleClose2(tag: string) {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
}

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = '';
};

/**
 * @description: 打开对话框
 */
function open(): void {
  Object.assign(form, {
    fileList: [], // 文件列表
    name: '', // 名称
    describe: '', // 描述
    tags: [], // 标签列表
    categoryId: '' // 分类id
  });
  step.value = 0;
  visible.value = true;
  if (formRef.value) {
    formRef.value.resetFields();
  }
}

/**
 * @description: 处理关闭
 */
function handleClose(): void {
  visible.value = false;
}

/**
 * @description: 改变步骤
 * @param {number} val 改变值
 */
function handleChangeStep(val: number): void {
  if (val === -1) {
    step.value -= 1;
  } else {
    step.value += 1;
    // formRef.value.validate(<FormValidateCallback>((isValid) => {
    //   if (isValid) {
    //     step.value += 1;
    //   }
    // }));
  }
}

/**
 * @description: 处理提交
 */
function handleSubmit(): void {}

/**
 * @description: 自定义上传文件逻辑
 * @param {UploadRequestOptions} option 配置
 */
function handleHttpRequest(option: UploadRequestOptions): void {
  option.onSuccess((<any>option.file).path || option.file.name);
}

defineExpose({ open });
</script>

<style lang="scss">
.addDialog {
  .el-upload {
    --el-upload-dragger-padding-horizontal: 10px;
  }

  .addDialog_space {
    width: 100%;

    .addDialog_space_form {
      .addDialog_space_form_item {
        .addDialog_space_form_item_upload,
        .el-select {
          width: 100%;
        }
      }
    }
  }
}
</style>
