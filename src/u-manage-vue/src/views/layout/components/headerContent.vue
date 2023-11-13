<template>
  <el-row class="header_content">
    <el-col class="header_content_column" :span="8">
      <el-dropdown trigger="click" @command="handleCommand">
        <el-icon class="header_content_column_button">
          <i-el-menu />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(item, index) in menuList"
              :key="index"
              :icon="item.icon"
              :command="item.command"
              >{{ item.title }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
    <el-col class="header_content_column" :span="16">
      <el-switch
        class="header_content_column_button header_content_column_switch"
        v-model="isDark"
        size="small"
        :active-icon="Moon"
        :inactive-icon="Sunny"
      />
      <el-icon
        v-for="(control, index) in controlList"
        class="header_content_column_button header_content_column_control"
        :title="control.title"
        :key="index"
        @click="control.onclick"
      >
        <component :is="control.icon" />
      </el-icon>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core';
import { Moon, Sunny } from '@element-plus/icons-vue';
import { useWindowControl } from '../hooks/windowControl';
import { useDropdownMenu } from '../hooks/dropdownMenu';

defineOptions({ name: 'headerContent' });

const { menuList, handleCommand } = useDropdownMenu(); // 下拉菜单按钮
const isDark = useDark(); // 是暗黑模式
const controlList = useWindowControl(); // 窗口控制按钮
</script>

<style lang="scss">
.header_content {
  -webkit-app-region: drag;
  height: 100%;

  .header_content_column {
    display: flex;

    &:last-child {
      justify-content: flex-end;
    }

    .header_content_column_button {
      -webkit-app-region: no-drag;
      height: 100%;
      padding: 0 20px;
    }

    .header_content_column_switch {
      --el-switch-on-color: var(--el-switch-off-color);
    }

    .header_content_column_control {
      position: relative;
      z-index: 9999;

      &:hover {
        background-color: var(--el-color-info-light-7);
      }

      &:last-child:hover {
        background-color: rgba(255, 0, 0, 0.8);
      }
    }
  }
}
</style>
