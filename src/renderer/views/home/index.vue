<template>
  <div class="home">
    <!-- 筛选条件 start -->
    <file-search @search="handleSearch" />
    <!-- 筛选条件 end -->

    <!-- 文件列表 start -->
    <file-list :list="list">
      <template v-slot="{ item }">
        <file-card
          :item="item"
          @edit="(row) => $refs.fileInfoDialog.open(row)"
        ></file-card>
      </template>
    </file-list>
    <!-- 文件列表 end -->

    <!-- 卡片对话框 start -->
    <file-info-dialog ref="fileInfoDialog" />
    <!-- 卡片对话框 end -->
  </div>
</template>

<script>
import fileSearch from "./components/fileSearch.vue";
import fileList from "./components/fileList.vue";
import fileCard from "./components/fileCard.vue";
import fileInfoDialog from "./components/fileInfoDialog.vue";

export default {
  data() {
    return {
      list: [], // 列表数据
    };
  },
  created() {
    // this.list = Array.from({ length: 100 });
  },
  methods: {
    /**
     * @name: 处理搜索
     * @param {string} text 搜索关键字
     */
    handleSearch(text) {},
  },
  components: {
    fileSearch,
    fileList,
    fileCard,
    fileInfoDialog,
  },
};
</script>
