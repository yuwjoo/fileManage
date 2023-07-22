<template>
  <div class="dataListItem">
    <!-- 文件信息 start -->
    <div class="dataListItem_title">{{ item.title }}</div>
    <div class="dataListItem_describe">
      {{ item.describe }}
    </div>
    <!-- 文件信息 end -->

    <!-- 遮罩层 start -->
    <div class="dataListItem_mark">
      <div class="dataListItem_mark_button">
        <icon-font
          class="dataListItem_mark_button_icon"
          icon="el-icon-folder-opened"
        />
        <div class="dataListItem_mark_button_label">打开文件夹</div>
      </div>
      <div
        class="dataListItem_mark_button"
        @click="$router.push({ name: 'markdown' })"
      >
        <icon-font
          class="dataListItem_mark_button_icon"
          icon="el-icon-tickets"
        />
        <div class="dataListItem_mark_button_label">打开文档</div>
      </div>
      <div class="dataListItem_mark_button" @click="$emit('edit', item)">
        <icon-font class="dataListItem_mark_button_icon" icon="el-icon-edit" />
        <div class="dataListItem_mark_button_label">编辑卡片</div>
      </div>
    </div>
    <!-- 遮罩层 end -->
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.dataListItem {
  border-bottom: 1px solid var(--font-color-dark);
  width: 100%;
  min-height: 100px;
  padding: 20px 10px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  &:hover {
    .dataListItem_mark {
      opacity: 1;
    }
  }

  .dataListItem_title {
    font-size: var(--font-size-medium);
  }

  .dataListItem_describe {
    margin-top: 10px;
    font-size: var(--font-size-extraSmall);
    color: var(--font-color-dark);
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
    background-color: rgba($color: #000000, $alpha: 0.5);
    justify-content: center;
    align-items: center;
    border-radius: 5px 5px 0 0;

    .dataListItem_mark_button {
      margin: 0 20px;
      text-align: center;
      cursor: pointer;
      user-select: none;

      &:hover {
        color: var(--font-color-light);
      }

      .dataListItem_mark_button_icon {
        font-size: var(--font-size-extraLarge);
      }

      .dataListItem_mark_button_label {
        text-align: center;
        margin-top: 10px;
      }
    }
  }
}
</style>
