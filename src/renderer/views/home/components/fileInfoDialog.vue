<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
    <el-form :mode="form" label-suffix=":" label-position="top">
      <el-form-item label="目标文件" prop="file">
        <input type="file" @input="input" />
      </el-form-item>
      <el-form-item label="卡片标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="卡片描述" prop="describe">
        <el-input
          v-model="form.describe"
          type="textarea"
          resize="none"
          :autosize="{ minRows: 3, maxRows: 6 }"
        />
      </el-form-item>
      <el-form-item label="卡片标签" prop="tags">
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
      <el-button type="primary" @click="handleSave">保 存</el-button>
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
      this.close();
    },
    input(ev) {
      console.log(ev.target.files[0].path);
    },
  },
};
</script>
