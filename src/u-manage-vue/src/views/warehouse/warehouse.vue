<template>
  <el-page-header class="warehouse" icon="">
    <template #title>
      <el-tooltip content="点击刷新列表" @click="getList">{{ categoryName }}</el-tooltip>
    </template>
    <template #content>
      <el-input
        class="warehouse__search-input"
        v-model="search.searchContent"
        placeholder="请输入关键字搜索"
        size="default"
        clearable
      />
    </template>
    <template #extra>
      <el-popover
        v-model:visible="visibleFilter"
        popper-class="warehouse-filter-popover"
        placement="bottom"
        :width="400"
        trigger="click"
      >
        <template #reference>
          <span>
            <el-tooltip content="筛选" :disabled="visibleFilter">
              <el-icon>
                <i-el-filter />
              </el-icon>
            </el-tooltip>
          </span>
        </template>
        <template #default>
          <el-form label-suffix=":">
            <el-form-item label="当前分类">
              <el-radio-group v-model="search.categoryId">
                <el-radio-button
                  v-for="(item, index) in select.category.list"
                  :key="index"
                  :label="item.id"
                  >{{ item.name }}</el-radio-button
                >
              </el-radio-group>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="search.createDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :editable="false"
                :teleported="false"
              />
            </el-form-item>
          </el-form>
          <div class="warehouse-filter-popover__option">
            <el-button type="default" @click="handleFilterReset">重置</el-button>
            <el-button
              type="primary"
              @click="
                handleFilterClose();
                getList();
              "
              >查询</el-button
            >
          </div>
        </template>
      </el-popover>
      <el-divider class="warehouse__divider--vertical" direction="vertical" />
      <el-tooltip content="切换表格">
        <el-icon><i-el-scale-to-original /></el-icon>
      </el-tooltip>
    </template>
    <template #default>
      <el-table
        v-loading="loading"
        class="warehouse__table"
        :data="list"
        border
        stripe
        height="100%"
      >
        <el-table-column prop="title" label="名称" min-width="100" align="center" />
        <el-table-column prop="describe" label="描述" min-width="150" align="center" />
        <el-table-column prop="tags" label="标签" min-width="100" align="center" />
        <el-table-column prop="option" label="操作" width="140" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              :icon="FolderOpened"
              circle
              title="打开目录"
              @click="handleOpenDir(scope.row)"
            />
            <el-button
              type="warning"
              :icon="Edit"
              circle
              title="编辑"
              @click="handleDeleteRow(scope.row)"
            />
            <el-button
              type="danger"
              :icon="Delete"
              circle
              title="删除"
              @click="handleEditRow(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-page-header>

  <!-- 创建分类对话框 start -->
  <create-category-dialog ref="createCategoryDialogRef" />
  <!-- 创建分类对话框 end -->

  <!-- 编辑分类对话框 start -->
  <edit-category-dialog />
  <!-- 编辑分类对话框 end -->

  <!-- 编辑资源对话框 start -->
  <edit-resource-dialog @create-category="createCategoryDialogRef?.open()" />
  <!-- 编辑资源对话框 end -->
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Delete, Edit, FolderOpened } from '@element-plus/icons-vue';
import { useWarehouseTable } from './hooks/warehouse/warehouseTable';
import { useWarehouseSelect } from './hooks/warehouse/warehouseSelect';
import { useWarehouseFilter } from './hooks/warehouse/warehouseFilter';
import createCategoryDialog from './components/createCategoryDialog.vue';
import editCategoryDialog from './components/editCategoryDialog.vue';
import editResourceDialog from './components/editResourceDialog.vue';

const { select, getCategoryList } = useWarehouseSelect(); // 下拉列表
const {
  loading,
  list,
  search,
  tableSearch,
  getList,
  handleOpenDir,
  handleDeleteRow,
  handleEditRow
} = useWarehouseTable(); // 表格数据
const { visibleFilter, handleFilterReset, handleFilterClose } = useWarehouseFilter(search); // 过滤器弹出层

const categoryName = computed(() => {
  const item = select.category.list.find(
    (item) => item[select.category.option.value] === tableSearch.value.categoryId
  );
  return item ? item[select.category.option.label] : '全部';
}); // 分类名称
const createCategoryDialogRef = ref<InstanceType<typeof createCategoryDialog>>(); // 创建分类对话框 ref

getCategoryList();
</script>

<style lang="scss">
.warehouse {
  .warehouse__search-input {
    width: 400px;
  }

  .warehouse__divider--vertical {
    vertical-align: baseline;
    margin: 0 16px;
  }

  .warehouse__table {
    margin-top: 15px;
  }
}

.warehouse-filter-popover {
  --el-popover-padding: 15px;

  .warehouse-filter-popover__option {
    text-align: right;
  }
}
</style>
