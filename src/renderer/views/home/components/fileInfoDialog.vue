<template>
  <el-dialog
    class="fileInfoDialog"
    :title="title"
    :visible.sync="dialogVisible"
    width="500px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      :mode="form"
      label-suffix=":"
      label-position="right"
      label-width="80px"
    >
      <el-form-item label="包含文件" prop="fileList">
        <el-upload
          action=""
          drag
          multiple
          :file-list="fileList"
          :http-request="handleUploadFile"
          :on-success="handleUploadSuccess"
          :on-remove="handleUploadRemove"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="描述" prop="describe">
        <el-input
          v-model="form.describe"
          type="textarea"
          resize="none"
          :autosize="{ minRows: 3, maxRows: 6 }"
        />
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-select
          v-model="form.tags"
          multiple
          filterable
          allow-create
          default-first-option
          style="width: 100%"
        >
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="handleSave"
        >保 存</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false, // 显示对话框
      dialogType: 1, // 对话框类型，1：新增；2：编辑
      row: null, // 原数据
      form: {}, // 表单数据
      saveLoading: false, // 保存加载中
      fileList: [], // 文件列表
    };
  },
  computed: {
    // 对话框标题
    title() {
      return ["新增", "编辑"][this.dialogType - 1] + "卡片";
    },
  },
  methods: {
    /**
     * @name: 打开对话框
     * @param {object} row 数据
     */
    open(row) {
      this.dialogType = row ? 2 : 1;
      this.row = row || {};
      this.fileList = this.row.fileList || [];
      this.form = JSON.parse(JSON.stringify(this.row));
      this.dialogVisible = true;
    },
    /**
     * @name: 关闭对话框
     */
    close() {
      this.dialogVisible = false;
    },
    /**
     * @name: 处理保存
     */
    handleSave() {
      this.saveLoading = true;
      window.electronAPI
        .saveList(this.form)
        .then((res) => {
          this.$emit(this.dialogType === 1 ? "add" : "change");
          this.close();
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "保存失败",
          });
        })
        .finally(() => {
          this.saveLoading = false;
        });
    },
    /**
     * @name: 处理上传文件
     * @param {object} option 相关参数
     */
    handleUploadFile(option) {
      option.onSuccess(option.file.path);
    },
    /**
     * @name: 处理上传文件成功
     * @param {string} response 响应结果
     * @param {object} file 文件
     * @param {object} fileList 文件列表
     */
    handleUploadSuccess(response, file, fileList) {
      this.$set(
        this.form,
        "fileList",
        fileList.map((v) => ({
          url: v.url || v.response,
          name: v.name,
        }))
      );
    },
    /**
     * @name: 处理删除上传文件
     * @param {object} file 文件
     * @param {object} fileList 文件列表
     */
    handleUploadRemove(file, fileList) {
      this.$set(
        this.form,
        "fileList",
        fileList.map((v) => ({
          url: v.url || v.response,
          name: v.name,
        }))
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.fileInfoDialog {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
