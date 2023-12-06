<template>
  <el-page-header class="warehouse" icon="">
    <template #title>
      <el-tooltip content="点击刷新列表" @click="setTableData">{{ categoryName }}</el-tooltip>
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
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button
                  v-for="(item, index) in category.list"
                  :key="index"
                  :label="item[category.option.value]"
                  >{{ item[category.option.value] }}</el-radio-button
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
                value-format="x"
                :editable="false"
                :teleported="false"
              />
            </el-form-item>
          </el-form>
          <div class="warehouse-filter-popover__option">
            <el-button type="default" @click="handleFilterReset">重置</el-button>
            <el-button type="primary" @click="handleFilterSearch({ setTableData })">查询</el-button>
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
        :data="tableData"
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

  <!-- 编辑资源对话框 start -->
  <edit-resource-dialog
    ref="editResourceDialogRef"
    :category="category"
    @open-create-category="createCategoryDialogRef!.open()"
  />
  <!-- 编辑资源对话框 end -->

  <!-- 编辑分类对话框 start -->
  <edit-category-dialog
    ref="editCategoryDialogRef"
    :category="category"
    @change="setCategoryList"
  />
  <!-- 编辑分类对话框 end -->

  <!-- 创建分类对话框 start -->
  <create-category-dialog ref="createCategoryDialogRef" @change="setCategoryList" />
  <!-- 创建分类对话框 end -->
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Delete, Edit, FolderOpened } from '@element-plus/icons-vue';
import { useWarehouseTable } from './hooks/warehouseTable';
import { useWarehouseSelect } from './hooks/warehouseSelect';
import { useWarehouseFilter } from './hooks/warehouseFilter';
import { editResourceDialogRef } from './hooks/editResourceDialog';
import { editCategoryDialogRef } from './hooks/editCategoryDialog';
import createCategoryDialog from './components/createCategoryDialog.vue';
import editCategoryDialog from './components/editCategoryDialog.vue';
import editResourceDialog from './components/editResourceDialog.vue';

const { category, setCategoryList, getCategoryName } = useWarehouseSelect(); // 下拉列表
const { loading, tableData, query, setTableData, handleOpenDir, handleDeleteRow, handleEditRow } =
  useWarehouseTable(); // 表格
const { visibleFilter, search, handleFilterReset, handleFilterSearch } = useWarehouseFilter(); // 过滤器弹出层
const categoryName = computed(() => getCategoryName(query.value.categoryId) || '全部'); // 分类名称
const createCategoryDialogRef = ref<InstanceType<typeof createCategoryDialog>>(); // 创建分类对话框 ref

setTableData(search);
setCategoryList();
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
