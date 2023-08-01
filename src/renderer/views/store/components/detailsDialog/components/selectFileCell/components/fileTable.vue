<template>
  <div class="fileTable">
    <div class="fileTable_options">
      <el-checkbox
        :indeterminate="isIndeterminate"
        :value="checkAll"
        @change="handleCheckAllChange"
        >全选</el-checkbox
      >
      <div class="fileTable_options_buttons">
        <span
          :class="[
            'fileTable_options_btn',
            {
              'fileTable_options_btn--disabled': !(isIndeterminate || checkAll),
            },
          ]"
          @click="handleBatchDelete"
          >批量删除</span
        >
        <span class="fileTable_options_btn" @click="handleClearList"
          >清空列表</span
        >
      </div>
    </div>
    <div class="fileTable_list">
      <el-checkbox-group v-model="checkedFiles">
        <div
          class="fileTable_list_item"
          v-for="(file, index) in list"
          :Key="index"
        >
          <el-checkbox class="fileTable_list_item_checkbox" :label="file.url">{{
            file.name
          }}</el-checkbox>
          <icon-font class="fileTable_list_item_close" icon="el-icon-close" />
        </div>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 文件列表(.sync)
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      checkedFiles: [], // 当前选中的文件列表
    };
  },
  computed: {
    // 控制全选按钮 indeterminate 状态
    isIndeterminate() {
      const checkedFilesLength = this.checkedFiles.length;
      return checkedFilesLength > 0 && checkedFilesLength < this.list.length;
    },
    // 是否选择了全部
    checkAll() {
      return this.checkedFiles.length === this.list.length;
    },
  },
  methods: {
    /**
     * @name: 点击全选按钮
     */
    handleCheckAllChange() {
      this.checkedFiles = this.checkAll
        ? []
        : this.list.map((item) => item.url);
    },
    /**
     * @name: 处理批量删除
     */
    handleBatchDelete() {
      if (!this.checkedFiles.length) return;
      const newList = this.list.filter(
        (item) => !this.checkedFiles.includes(item.url)
      );
      this.$emit("update:list", newList);
    },
    /**
     * @name: 处理清空列表
     */
    handleClearList() {
      this.$emit("update:list", []);
    },
  },
};
</script>

<style lang="scss" scoped>
// 复选框样式调整
.el-checkbox {
  &.is-checked {
    :deep(.el-checkbox__input) {
      .el-checkbox__inner {
        background-color: var(--font-color-active);
        border-color: var(--font-color-active);
      }
    }

    :deep(.el-checkbox__label) {
      color: var(--font-color-active);
    }
  }

  :deep(.el-checkbox__input) {
    .el-checkbox__inner {
      display: block;
      width: var(--font-size-small);
      height: var(--font-size-small);

      &::after {
        top: 0;
        left: 3px;
      }
    }
  }

  :deep(.el-checkbox__label) {
    font-size: var(--font-size-small);
    color: var(--font-color-base);
    line-height: var(--line-height-none);
  }
}

// 列表样式
.fileTable {
  font-size: var(--font-size-small);

  .fileTable_options {
    line-height: var(--line-height-none);
    margin: 0 4px 3px;
    display: flex;
    align-items: center;

    .fileTable_options_buttons {
      text-align: right;
      flex: 1;

      .fileTable_options_btn {
        margin-left: 10px;
        user-select: none;

        &:hover {
          color: var(--font-color-active);
          cursor: pointer;
        }

        &.fileTable_options_btn--disabled {
          color: var(--font-color-secondary);
        }
      }
    }
  }

  .fileTable_list {
    max-height: 150px;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: var(--background-color-block-input);
    box-sizing: border-box;
    border: 1px solid var(--font-color-secondary);
    border-radius: 4px;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      background-color: var(--background-color-block-input);
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--background-color-block-show);
      border-radius: 5px;

      &:hover {
        background-color: var(--background-color-active);
      }
    }

    &:hover {
      border-color: var(--font-color-base);
    }

    .fileTable_list_item {
      padding: 3px;

      &:not(:last-child) {
        border-bottom: 1px dotted var(--font-color-secondary);
      }

      .fileTable_list_item_checkbox {
        width: 90%;
        display: inline-flex;
        align-items: center;

        :deep(.el-checkbox__label) {
          flex: 1;
          white-space: normal;
        }
      }

      .fileTable_list_item_close {
        float: right;
        padding-left: 3%;

        &:hover {
          color: var(--font-color-light);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
