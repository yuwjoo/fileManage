<template>
  <div class="home">
        <resource-table ref="resourceTableRef" />
    <!-- <el-tabs class="home_tabs" v-model="tabId" tab-position="top" @tab-change="handleTabChange">
      <el-tab-pane
        v-for="(tab, index) in [tabList[0]]"
        :key="index"
        :label="tab[category.option.label]"
        :name="index"
        lazy
      >
        <resource-table ref="resourceTableRef" :category-id="tab.id" />
      </el-tab-pane>
    </el-tabs>
    <el-tabs class="home_tabs" v-model="tabId" tab-position="top" @tab-change="handleTabChange">
      <el-tab-pane
        v-for="(tab, index) in [tabList[1]]"
        :key="index"
        :label="tab[category.option.label]"
        :name="index"
        lazy
      >
        <resource-table ref="resourceTableRef" :category-id="tab.id" />
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ResourceTable from './components/resourceTable.vue';
import type { TabPaneName } from 'element-plus';
import { useSelectStore } from '@/stores/select';

defineOptions({ name: 'home' });

const tabId = ref<number>(0);
const resourceTableRef = ref<Array<InstanceType<typeof ResourceTable>>>([]);
const { category, getCategoryList } = useSelectStore(); // 下拉列表 store
const tabList = computed(() => {
  return [{ name: '全部', directory: '' }, ...category.list];
});

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

<style lang="scss"></style>
