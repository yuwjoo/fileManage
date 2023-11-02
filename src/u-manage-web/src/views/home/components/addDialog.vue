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

      <el-form class="addDialog_space_form" ref="formRef" :model="form">
        <div v-show="step === 0">
          <el-form-item class="addDialog_space_form_item" prop="fileList">
            <el-upload
              class="addDialog_space_form_item_upload"
              v-model:file-list="form.fileList"
              drag
              action=""
              multiple
              :on-change="handleChangeFileList"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">拖拽文件或者 <em>点击添加</em></div>
            </el-upload>
          </el-form-item>
        </div>
        <div v-show="step === 1"></div>
        <div v-show="step === 2"></div>
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
import type { UploadFiles, UploadFile, UploadUserFile } from "element-plus";

interface Form {
  fileList: UploadUserFile[];
}

const visible = ref<boolean>(false); // 是否显示对话框
const step = ref<number>(0); // 当前步骤
const formRef = ref<any>(null); // 表单ref
const form = reactive<Form>({
  fileList: [], // 文件列表
});

/**
 * @description: 打开对话框
 */
function open(): void {
  visible.value = true;
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
  step.value += val;
}

/**
 * @description: 处理提交
 */
function handleSubmit(): void {}

/**
 * @description: 文件列表改变
 * @param {UploadFile} _file 添加的文件
 * @param {UploadFiles} fileList 文件列表
 */
function handleChangeFileList(_file: UploadFile, fileList: UploadFiles): void {
  console.log(_file);
}

defineExpose({ open });
</script>

<style lang="scss">
.addDialog {
  .addDialog_space {
    width: 100%;

    .addDialog_space_form {
      .addDialog_space_form_item {
        .addDialog_space_form_item_upload {
          width: 100%;
        }
      }
    }
  }
}
</style>
