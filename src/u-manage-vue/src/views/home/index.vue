<template>
  <div class="home">
    <el-tabs class="home_tabs" v-model="tabId" tab-position="top" @tab-change="handleTabChange">
      <el-tab-pane
        v-for="(tab, index) in categoryList"
        :key="index"
        :label="tab.name"
        :name="index"
        lazy
      >
        <resource-table ref="resourceTableRef" :category-id="tab.id" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ResourceTable from './components/resourceTable.vue';
import type { TabPaneName } from 'element-plus';
import { selectCategoryList } from '@/api/home';

defineOptions({ name: 'home' });

const tabId = ref<number>(0);
const resourceTableRef = ref<Array<InstanceType<typeof ResourceTable>>>([]);
const categoryList = ref<any[]>([]); // 分类列表

/**
 * @description: 获取分类列表
 */
function getCategoryList() {
  selectCategoryList().then(() => {
    categoryList.value = [
      { id: 1, name: '全部' },
      { id: 2, name: '工具' },
      { id: 3, name: '文档' },
      { id: 4, name: '其他' }
    ];
  });
}

/**
 * @description: 处理tab改变
 * @param {TabPaneName} activeName  当前选中name
 */
function handleTabChange(activeName: TabPaneName) {
  const tableRef = resourceTableRef.value[activeName as number];
  if (tableRef) tableRef.getData();
}

getCategoryList();
</script>

<style lang="scss">
.home {
  .home_tabs {
    margin-top: -20px;
  }
}
</style>
