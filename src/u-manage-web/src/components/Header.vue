<template>
  <div class="header">
    <el-row class="header_row">
      <el-col class="header_row_col" :span="6" :offset="18">
        <el-space :size="0">
          <el-icon @click="test"><RefreshRight /></el-icon>
          <el-icon @click="handleReload"><RefreshRight /></el-icon>
          <el-icon @click="hanldeWindowMin"><Minus /></el-icon>
          <el-icon @click="hanldeWindowMax">
            <Files v-if="isMaximize" />
            <FullScreen v-else />
          </el-icon>
          <el-icon @click="hanldeWindowClose"><Close /></el-icon>
        </el-space>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useElectronListener, useElectronRequest } from "@/hooks/electron";
import { useRouter, useRoute } from "vue-router";

defineOptions({
  name: "Header",
});
const router = useRouter();
const route = useRoute();
const isMaximize = ref<Boolean>(false); // 窗口是否最大化

// 监听最大化窗口变化
useElectronListener(
  "window:changeMaximize",
  (is: boolean) => {
    isMaximize.value = is;
  },
  { immediate: true }
);

/**
 * @description: 处理窗口最大化/还原
 */
function hanldeWindowMax() {
  if (isMaximize.value) {
    useElectronRequest("window:restore");
  } else {
    useElectronRequest("window:maximize");
  }
}

/**
 * @description: 处理窗口最小化
 */
function hanldeWindowMin() {
  useElectronRequest("window:minimize");
}

/**
 * @description: 处理窗口关闭
 */
function hanldeWindowClose() {
  useElectronRequest("window:close");
}

/**
 * @description: 处理刷新页面
 */
function handleReload() {
  window.location.reload();
}

function test() {
  router.push({ name: route.name === "home" ? "abort" : "home" });
}
</script>

<style lang="scss">
.header {
  height: 40px;

  .header_row {
    -webkit-app-region: drag;
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;

    .header_row_col {
      text-align: right;

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
}
</style>
