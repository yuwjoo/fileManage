<template>
  <div class="header">
    <el-row class="header_row">
      <el-col class="header_row_col" :span="6" :offset="18">
        <el-space :size="0">
          <el-icon @click="handleReload">
            <i-ep-refresh-right />
          </el-icon>
          <el-icon @click="handleExec('minimize')">
            <i-ep-minus />
          </el-icon>
          <el-icon v-if="isMaximize" @click="handleExec(`restore`)">
            <i-ep-files />
          </el-icon>
          <el-icon v-else @click="handleExec(`maximize`)">
            <i-ep-full-screen />
          </el-icon>
          <el-icon @click="handleExec(`close`)">
            <i-ep-close />
          </el-icon>
        </el-space>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useElectron } from "@/hooks/electron";

defineOptions({
  name: "Header",
});
const electron = useElectron();
const isMaximize = ref<Boolean>(false); // 窗口是否最大化

// 监听最大化窗口变化
electron.listener(
  "window:changeMaximize",
  (is: boolean) => {
    isMaximize.value = is;
  },
  { immediate: true }
);

/**
 * @description: 处理执行指令
 * @param {string} command 指令
 */
function handleExec(command: string): void {
  electron.request(`window:${command}`);
}

/**
 * @description: 处理刷新页面
 */
function handleReload() {
  window.location.reload();
}
</script>

<style lang="scss">
.header {
  height: 36px;

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
