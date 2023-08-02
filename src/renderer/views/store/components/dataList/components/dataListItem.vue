<template>
  <div class="dataListItem">
    <!-- 数据信息 start -->
    <div class="dataListItem_title">{{ item.title }}</div>
    <div class="dataListItem_describe">
      {{ item.describe }}
    </div>
    <!-- 数据信息 end -->

    <!-- 遮罩层 start -->
    <div class="dataListItem_mark">
      <el-dropdown
        class="dataListItem_mark_dropdown"
        trigger="hover"
        placement="right"
        @command="handleClickDropdown"
      >
        <span class="dataListItem_mark_dropdown_content"
          ><icon-font icon="el-icon-more"
        /></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in optionList"
            :key="index"
            :icon="item.icon"
            :command="item.value"
            >{{ item.label }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <div
        class="dataListItem_mark_button"
        @click="$electron.openDataDir(`${item.title}/source`)"
      >
        <icon-font
          class="dataListItem_mark_button_icon"
          icon="el-icon-folder-opened"
        />
        <div class="dataListItem_mark_button_label">打开文件夹</div>
      </div>
      <div
        class="dataListItem_mark_button"
        @click="
          $router.push({ name: 'markdown', query: { title: item.title } })
        "
      >
        <icon-font
          class="dataListItem_mark_button_icon"
          icon="el-icon-tickets"
        />
        <div class="dataListItem_mark_button_label">打开文档</div>
      </div>
      <div class="dataListItem_mark_button" @click="$emit('edit', item)">
        <icon-font class="dataListItem_mark_button_icon" icon="el-icon-edit" />
        <div class="dataListItem_mark_button_label">编辑详情</div>
      </div>
    </div>
    <!-- 遮罩层 end -->
  </div>
</template>

<script>
export default {
  name: "dataListItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      optionList: [{ icon: "el-icon-delete", label: "删除", value: "delete" }], // 更多下拉菜单列表
    };
  },
  methods: {
    /**
     * @name: 处理点击更多下拉项
     * @param {string} command 指令
     */
    handleClickDropdown(command) {
      if (command === "delete") {
        this.$electron.deleteData(this.item.title).then(() => {
          this.$emit("change");
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dataListItem {
  width: 100%;
  height: 100%;
  min-height: 100px;
  padding: 15px 10px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  background-color: var(--background-color-block-show);

  &:hover {
    .dataListItem_mark {
      opacity: 1;
    }
  }

  .dataListItem_title {
    font-size: var(--font-size-base);
    color: var(--font-color-light);
    line-height: var(--line-height-base);
  }

  .dataListItem_describe {
    margin-top: 10px;
    font-size: var(--font-size-small);
    color: var(--font-color-secondary);
    line-height: var(--line-height-base);
    display: -webkit-box; /* 将元素设为一个弹性伸缩盒子 */
    -webkit-box-orient: vertical; /* 设定元素为垂直方向 */
    overflow: hidden; /* 隐藏超出部分 */
    text-overflow: ellipsis; /* 超出部分用省略号(...)表示 */
    -webkit-line-clamp: 4; /* 限制文本显示n行 */
    line-clamp: 4;
  }

  .dataListItem_mark {
    opacity: 0;
    transition: opacity 0.3s;
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: var(--mark-color);
    justify-content: center;
    align-items: center;
    border-radius: 5px 5px 0 0;

    .dataListItem_mark_dropdown {
      position: absolute;
      right: 10px;
      top: 5px;

      .dataListItem_mark_dropdown_content {
        cursor: pointer;
        font-size: calc(var(--font-size-base) + 4px);
      }
    }

    .dataListItem_mark_button {
      margin: 0 20px;
      text-align: center;
      cursor: pointer;
      user-select: none;

      &:hover {
        color: var(--font-color-active);
      }

      .dataListItem_mark_button_icon {
        font-size: 20px;
      }

      .dataListItem_mark_button_label {
        text-align: center;
        margin-top: 10px;
      }
    }
  }
}
</style>
