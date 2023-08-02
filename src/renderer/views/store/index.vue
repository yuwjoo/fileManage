<template>
  <div class="home">
    <!-- 筛选条件 start -->
    <search-bar @search="handleSearch" />
    <!-- 筛选条件 end -->

    <!-- 数据列表 start -->
    <data-list
      :list="list"
      @edit="handleOpenDetailDialog"
      @change="getData()"
    />
    <!-- 数据列表 end -->

    <!-- 详情对话框 start -->
    <details-dialog ref="detailsDialog" @add="getData()" @change="getData()" />
    <!-- 详情对话框 end -->
  </div>
</template>

<script>
import searchBar from "./components/searchBar";
import dataList from "./components/dataList";
import detailsDialog from "./components/detailsDialog";

export default {
  name: "keep-store",
  data() {
    return {
      search: {}, // 筛选条件
      list: [], // 列表数据
      page: null, // 分页
      loading: false, // 加载中
    };
  },
  created() {
    this.$on("add", this.handleOpenDetailDialog);
    this.init();
    this.getData();
  },
  methods: {
    /**
     * @name: 初始化
     */
    init() {
      this.search = {};
      this.list = [];
      this.loading = false;
      this.page = {
        current: 1,
        size: 100,
        total: 0,
      };
    },
    /**
     * @name: 获取数据列表
     */
    getData() {
      this.loading = true;
      this.$electron
        .getList()
        .then((res) => {
          this.list = res || [];
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "数据查询失败！",
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * @name: 处理搜索
     * @param {string} text 搜索关键字
     */
    handleSearch(text) {
      this.init();
      this.$set(this.search, "searchText", text);
      this.getData();
    },
    /**
     * @name: 处理打开详情对话框
     * @param {object} data 详情数据
     */
    handleOpenDetailDialog(data) {
      this.$refs.detailsDialog?.open?.(data);
    },
  },
  components: {
    searchBar,
    dataList,
    detailsDialog,
  },
};
</script>
