<template>
  <el-row class="layout_content">
    <el-col class="layout_content_column" :span="8">
      <el-icon class="layout_content_column_menu">
        <i-el-menu />
      </el-icon>
    </el-col>
    <el-col class="layout_content_column" :span="16">
      <el-switch
        class="layout_content_column_switch"
        v-model="isDark"
        size="small"
        :active-icon="Moon"
        :inactive-icon="Sunny"
      />
      <template v-if="showControl">
        <template v-if="isDevEnv">
          <el-icon
            class="layout_content_column_control"
            title="打开控制台"
            @click="handleOpenDevTools"
          >
            <i-iconfont-dev-tools />
          </el-icon>
          <el-icon class="layout_content_column_control" title="刷新页面" @click="handleReload">
            <i-el-refresh-right />
          </el-icon>
        </template>
        <el-icon class="layout_content_column_control" title="最小化" @click="handleMinimize">
          <i-iconfont-minimize />
        </el-icon>
        <el-icon
          v-if="isMaximize"
          class="layout_content_column_control"
          title="还原"
          @click="handleRestore"
        >
          <i-iconfont-restore />
        </el-icon>
        <el-icon
          v-else
          class="layout_content_column_control"
          title="最大化"
          @click="handleMaximize"
        >
          <i-iconfont-maximize />
        </el-icon>
        <el-icon class="layout_content_column_control" title="关闭" @click="handleClose">
          <i-iconfont-close />
        </el-icon>
      </template>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDark } from '@vueuse/core';
import { Moon, Sunny } from '@element-plus/icons-vue';
import { useElectron } from '@/hooks/electron';

defineOptions({ name: 'layoutContent' });

const electron = useElectron(); // electron api
const isDevEnv = import.meta.env.DEV; // 是开发环境
const isDark = useDark(); // 是暗黑模式
const isMaximize = ref<Boolean>(false); // 是最大化窗口
const showControl = !!electron?.isElectronEnv; // 显示窗口控制按钮

/**
 * @description: 监听窗口最大化状态改变
 */
if (showControl) {
  electron.listener('window:changeMaximize', (is: boolean) => (isMaximize.value = is), {
    immediate: true
  });
}

/**
 * @description: 处理打开控制台
 */
function handleOpenDevTools() {
  electron.request('window:openDevTools');
}

/**
 * @description: 处理打开控制台
 */
function handleMinimize() {
  electron.request('window:minimize');
}

/**
 * @description: 处理重置窗口大小
 */
function handleRestore() {
  electron.request('window:restore');
}

/**
 * @description: 处理最大化窗口
 */
function handleMaximize() {
  electron.request('window:maximize');
}

/**
 * @description: 处理关闭窗口
 */
function handleClose() {
  electron.request('window:close');
}

/**
 * @description: 处理刷新页面
 */
function handleReload() {
  window.location.reload();
}
</script>

<style lang="scss">
// 按钮基本样式
%base_button {
  -webkit-app-region: no-drag;
  height: 100%;
  padding: 0 20px;
}

.layout_content {
  -webkit-app-region: drag;
  // border-bottom: 1px solid var(--el-border-color);
  height: 100%;

  .layout_content_column {
    display: flex;

    &:last-child {
      justify-content: flex-end;

      .layout_content_column_control {
        @extend %base_button;

        &:hover {
          background-color: var(--el-color-info-light-7);
        }

        &:last-child:hover {
          background-color: rgba(255, 0, 0, 0.8);
        }
      }
    }

    .layout_content_column_menu {
      @extend %base_button;
    }

    .layout_content_column_switch {
      @extend %base_button;

      --el-switch-on-color: var(--el-switch-off-color);
    }
  }
}
</style>
