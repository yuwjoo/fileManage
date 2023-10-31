<template>
  <el-row class="header">
    <el-col class="header_system" :span="6" :offset="18">
      <el-icon @click="hanldeWindowMin"><Minus /></el-icon>
      <el-icon @click="hanldeWindowMax">
        <Files v-if="isMaximize" />
        <FullScreen v-else />
      </el-icon>
      <el-icon @click="hanldeWindowClose"><Close /></el-icon>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useElectronListener } from "@/hooks/electron";

defineOptions({
  name: "Header",
});

const isMaximize = ref<Boolean>(false); // 窗口是否最大化

// 监听最大化窗口变化
useElectronListener("changeMaximize", (is: boolean) => {
  isMaximize.value = is;
});

/**
 * @description: 处理窗口最大化/还原
 */
function hanldeWindowMax() {
  if (isMaximize) {
    // window.electronApi.windowRestore();
  } else {
    // window.electronApi.windowMaximize();
  }
}

/**
 * @description: 处理窗口最小化
 */
function hanldeWindowMin() {
  // window.electronApi.windowRestore();
}

/**
 * @description: 处理窗口关闭
 */
function hanldeWindowClose() {
  // window.electronApi.windowClose();
}
</script>

<style lang="scss">
.header {
  -webkit-app-region: drag;

  .header_system {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .el-icon {
      -webkit-app-region: no-drag;
      padding: 10px 20px;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);

        &:last-child {
          background-color: rgba(255, 0, 0, 1);
          color: white;
        }
      }
    }
  }
}
</style>
