<template>
  <el-container class="layout">
    <el-header class="layout_header" height="40px">
      <el-row>
        <el-col :span="6">
          <el-icon>
            <i-el-setting />
          </el-icon>
        </el-col>
        <el-col :span="12"></el-col>
        <el-col :span="6">
          <template v-if="isShow">
            <template v-if="isDev">
              <el-icon @click="openDevTools">
                <i-iconfont-dev-tools />
              </el-icon>
              <el-icon @click="reload">
                <i-el-refresh-right />
              </el-icon>
            </template>
            <el-icon @click="min">
              <i-iconfont-minimize />
            </el-icon>
            <el-icon v-if="isMaximize" @click="restore">
              <i-iconfont-restore />
            </el-icon>
            <el-icon v-else @click="max">
              <i-iconfont-maximize />
            </el-icon>
            <el-icon @click="close">
              <i-iconfont-close />
            </el-icon>
          </template>
        </el-col>
      </el-row>
    </el-header>

    <el-main class="layout_main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { useWindowControl } from './hooks/windowControl';

defineOptions({ name: 'layout' });

const { isShow, isMaximize, reload, min, max, restore, close, openDevTools } = useWindowControl();
const isDev = import.meta.env.DEV;
</script>

<style lang="scss">
.layout {
  .layout_header {
    -webkit-app-region: drag;
    padding: 0;

    .el-row {
      height: 100%;

      .el-col {
        &:last-child {
          text-align: right;

          .el-icon:last-child:hover {
            background-color: rgba(255, 0, 0, 0.8);
          }
        }

        .el-icon {
          -webkit-app-region: no-drag;
          height: 100%;
          padding: 0 20px;

          &:hover {
            background-color: rgba(0, 0, 0, 0.2);
          }
        }
      }
    }
    // z-index: 9999;
    // position: fixed;
    // top: 0;
    // left: 0;
    // width: 100%;
    // background-color: white;

    // .header_row_col {
    //   text-align: right;

    //   .el-icon {
    //     -webkit-app-region: no-drag;
    //     padding: 10px 20px;

    //     &:hover {
    //       background-color: rgba(0, 0, 0, 0.1);

    //       &:last-child {
    //         background-color: rgba(255, 0, 0, 1);
    //         color: white;
    //       }
    //     }
    //   }
    // }
  }
}
</style>
