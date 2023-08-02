<template>
  <el-dialog
    class="detailsDialog"
    width="45%"
    top="13vh"
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      :mode="form"
      label-suffix=":"
      label-position="right"
      label-width="85px"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="" />
      </el-form-item>
      <el-form-item label="资源文件" prop="title">
        <select-file-cell v-model="form.sourceList" />
      </el-form-item>
      <el-form-item label="指南文档" prop="title">
        <select-file-cell v-model="form.guideList" accept=".md,.txt,.js" />
      </el-form-item>
      <el-form-item label="描述" prop="describe">
        <el-input
          v-model="form.describe"
          type="textarea"
          resize="none"
          placeholder=""
          :autosize="{ minRows: 4, maxRows: 7 }"
        />
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-select
          v-model="form.tags"
          multiple
          filterable
          allow-create
          placeholder=""
          default-first-option
          style="width: 100%"
        >
        </el-select>
      </el-form-item>
      <el-form-item label="分组" prop="title">
        <el-select
          v-model="form.group"
          filterable
          allow-create
          placeholder=""
          default-first-option
          style="width: 100%"
        >
        </el-select>
      </el-form-item>
      <el-form-item label="所属" prop="title">
        <el-select
          v-model="form.affiliation"
          filterable
          placeholder=""
          default-first-option
          style="width: 100%"
        >
          <el-option
            v-for="(item, index) in menuList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" :loading="saveLoading" @click="handleSave"
        >保 存</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import selectFileCell from "./components/selectFileCell";

export default {
  name: "detailsDialog",
  data() {
    return {
      dialogVisible: false, // 显示对话框
      dialogType: 1, // 对话框类型，1：新增；2：编辑
      row: null, // 原数据
      form: {}, // 表单数据
      saveLoading: false, // 保存加载中
      menuList: [
        { label: "仓库", value: "store" },
        { label: "临时区", value: "temporaries" },
      ],
    };
  },
  computed: {
    // 对话框标题
    title() {
      return ["新增", "编辑"][this.dialogType - 1] + "管理";
    },
  },
  methods: {
    /**
     * @name: 打开对话框
     * @param {object} row 数据
     */
    open(row) {
      this.dialogType = row ? 2 : 1;
      this.row = row || { sourceList: [], guideList: [], affiliation: "store" };
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
  },
  components: {
    selectFileCell,
  },
};
</script>

<style lang="scss" scoped>
.detailsDialog {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
