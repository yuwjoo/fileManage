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
        <el-step title="添加文件" icon="DocumentAdd" />
        <el-step title="填写信息" icon="EditPen" />
        <el-step title="确认提交" icon="Finished" />
      </el-steps>

      <el-form
        class="addDialog_space_form"
        ref="formRef"
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
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">拖拽文件或者 <em>点击添加</em></div>
            </el-upload>
          </el-form-item>
        </div>
        <div v-else-if="step === 1">
          <el-form-item
            class="addDialog_space_form_item"
            label="分类"
            prop="categoryId"
            :label-width="80"
          >
            <el-select
              v-model="form.categoryId"
              placeholder="请选择或输入"
              no-data-text="上方输入即可创建分类"
              clearable
              filterable
              allow-create
              default-first-option
            ></el-select>
          </el-form-item>
          <el-form-item
            class="addDialog_space_form_item"
            label="名称"
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
            label="描述"
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
            label="标签"
            prop="tags"
            :label-width="80"
          >
            <el-select
              v-model="form.tags"
              placeholder="请输入"
              no-data-text="上方输入即可创建标签"
              clearable
              multiple
              filterable
              allow-create
              default-first-option
            ></el-select>
          </el-form-item>
        </div>
        <div v-else-if="step === 2">
          <el-descriptions title="" border direction="vertical">
            <el-descriptions-item label="名称">{{
              form.name
            }}</el-descriptions-item>
            <el-descriptions-item label="分类" :span="10">{{
              form.categoryId
            }}</el-descriptions-item>
            <el-descriptions-item label="标签" :span="3">
              <el-tag
                size="small"
                v-for="(tag, index) in form.tags"
                :key="index"
                >{{ tag }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item label="描述"
              >{{ form.describe }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-form>
    </el-space>

    <template #footer>
      <el-button v-if="step > 0" @click="handleChangeStep(-1)"
        >上一步</el-button
      >
      <el-button v-else @click="handleClose">取消</el-button>
      <el-button v-if="step < 2" type="primary" @click="handleChangeStep(1)"
        >下一步</el-button
      >
      <el-button v-else type="primary" @click="handleSubmit">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type {
  UploadUserFile,
  UploadRequestOptions,
  FormValidateCallback,
  FormRules,
} from "element-plus";

interface Form {
  fileList: UploadUserFile[];
  name: string;
  describe: string;
  tags: string[];
  categoryId: string;
}

const visible = ref<boolean>(false); // 是否显示对话框
const step = ref<number>(0); // 当前步骤
const formRef = ref<any>(null); // 表单ref
const form = reactive<Form>({
  fileList: [], // 文件列表
  name: "", // 名称
  describe: "", // 描述
  tags: [], // 标签列表
  categoryId: "", // 分类id
});
const rules = reactive<FormRules<Form>>({
  fileList: [
    {
      validator: (_rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error("请添加文件"));
        } else {
          callback();
        }
      },
      trigger: "change",
    },
  ],
  categoryId: [
    { required: true, message: "请选择或输入分类", trigger: "change" },
  ],
  name: [{ required: true, message: "请输入名称", trigger: "change" }],
}); // 校验规则

/**
 * @description: 打开对话框
 */
function open(): void {
  Object.assign(form, {
    fileList: [], // 文件列表
    name: "", // 名称
    describe: "", // 描述
    tags: [], // 标签列表
    categoryId: "", // 分类id
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
    formRef.value.validate(<FormValidateCallback>((isValid) => {
      if (isValid) {
        step.value += 1;
      }
    }));
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
