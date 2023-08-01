<template>
  <div class="selectFileCell">
    <div class="selectFileCell_select">
      <div
        class="selectFileCell_select_item"
        v-for="(item, index) in butttonList"
        :key="index"
      >
        <icon-font class="selectFileCell_select_item_icon" :icon="item.icon" />
        <div class="selectFileCell_select_item_label">{{ item.label }}</div>
      </div>
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
  },
  computed: {
    // 按钮列表
    butttonList() {
      let buttons = [
        { icon: "el-icon-document", label: "导入文件", type: "file" },
      ];
      if (this.directory) {
        buttons.push({
          icon: "el-icon-document",
          label: "导入文件夹",
          type: "dir",
        });
      }
      return buttons;
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
    margin-left: 3px;

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
