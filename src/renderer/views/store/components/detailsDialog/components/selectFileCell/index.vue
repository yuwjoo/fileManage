<template>
  <div class="selectFileCell">
    <div class="selectFileCell_select">
      <div
        class="selectFileCell_select_item"
        v-for="(item, index) in butttonList"
        :key="index"
        @click="handleOpenFileManage(item.type)"
      >
        <icon-font class="selectFileCell_select_item_icon" :icon="item.icon" />
        <div class="selectFileCell_select_item_label">{{ item.label }}</div>
      </div>
      <input
        ref="fileManage"
        type="file"
        :accept="accept"
        multiple
        style="display: none"
        @change="handleSelectFile"
      />
    </div>
    <file-table
      v-if="value.length"
      class="selectFileCell_fileTable"
      :list="value"
      @update:list="$emit('input', $event)"
    />
  </div>
</template>

<script>
import fileTable from "./components/fileTable";

export default {
  props: {
    value: {
      type: Array,
      required: true,
    },
    // 显示导入文件夹按钮
    directory: {
      type: Boolean,
      required: false,
    },
    // 文件过滤规则
    accept: {
      type: String,
      required: false,
    },
  },
  computed: {
    // 按钮列表
    butttonList() {
      let buttons = [
        { icon: "el-icon-document", label: "导入文件", type: "file" },
      ];
      if (this.directory) {
        buttons.push({
          icon: "el-icon-folder",
          label: "导入文件夹",
          type: "dir",
        });
      }
      return buttons;
    },
  },
  methods: {
    /**
     * @name: 处理打开文件管理器
     * @param {string} type 打开类型
     */
    handleOpenFileManage(type) {
      const { fileManage } = this.$refs;
      const option = type === "file" ? "removeAttribute" : "setAttribute";

      fileManage[option]("webkitdirectory", "webkitdirectory");
      fileManage.value = "";
      fileManage.click();
    },
    /**
     * @name: 处理选择的文件
     * @param {event} ev 事件对象
     */
    handleSelectFile(ev) {
      const { fileManage } = this.$refs;
      const files = [...ev.target.files];
      let tempList = [...this.value];
      let newFiles = files.map((v) => ({ name: v.name, path: v.path }));

      if (fileManage.getAttribute("webkitdirectory") === "webkitdirectory") {
        const [, name, filename] = files[0].webkitRelativePath
          .replace("/", "\\\\")
          .match(/^(.+)\\(\\.+)$/);
        newFiles = [
          {
            name,
            path: files[0].path.replace(filename, ""),
          },
        ];
      }
      newFiles.forEach((file) => {
        const repeatIndex = tempList.findIndex(
          (item) => item.name === file.name
        );
        if (repeatIndex !== -1) {
          tempList.splice(repeatIndex, 1, file);
        } else {
          tempList.push(file);
        }
      });
      this.$emit("input", tempList);
    },
  },
  components: {
    fileTable,
  },
};
</script>

<style lang="scss" scoped>
.selectFileCell {
  color: var(--font-color-base);

  .selectFileCell_select {
    margin-left: 5px;

    .selectFileCell_select_item {
      position: relative;
      height: 100%;
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      margin-right: 20px;

      &:hover {
        .selectFileCell_select_item_icon,
        .selectFileCell_select_item_label {
          color: var(--font-color-active);
        }

        .selectFileCell_select_badge {
          opacity: 0.5;
        }
      }

      .selectFileCell_select_item_icon {
        color: var(--font-color-light);
      }

      .selectFileCell_select_item_label {
        margin-left: 5px;
        font-size: var(--font-size-small);
      }
    }
  }

  .selectFileCell_fileTable {
    margin-top: 10px;
  }
}
</style>
