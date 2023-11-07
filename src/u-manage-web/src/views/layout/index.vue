<template>
  <div class="layout">
    <el-row class="layout_header">
      <el-col :span="18"></el-col>
      <el-col v-if="windowControl.isEnable" :span="6">
        <el-icon @click="windowControl.handleReload">
          <i-ep-refresh-right />
        </el-icon>
        <el-icon @click="windowControl.handleExec('minimize')">
          <i-ep-minus />
        </el-icon>
        <template v-if="windowControl.isMaximize">
          <el-icon @click="windowControl.handleExec(`restore`)">
            <i-ep-files />
          </el-icon>
        </template>
        <template v-else>
          <el-icon @click="windowControl.handleExec(`maximize`)">
            <i-ep-full-screen />
          </el-icon>
        </template>
        <el-icon @click="windowControl.handleExec(`close`)">
          <i-ep-close />
        </el-icon>
      </el-col>
    </el-row>

    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script setup lang="ts">
import { useWindowControl } from "./hooks/windowControl";

const windowControl = useWindowControl();
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
