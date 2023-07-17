<template>
  <div class="markdown">
    <mavon-editor
      ref="md"
      v-model="content"
      :subfield="false"
      :defaultOpen="'preview'"
      :toolbarsFlag="false"
      :editable="false"
      :scrollStyle="true"
      :ishljs="true"
    />
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  data() {
    return {
      content: `[返回](/README.md)

## Router 说明

### Route Mete Attributes
|             参数             |                                  说明                                   |           类型            |     可选值     |       默认值        |
| :--------------------------: | :---------------------------------------------------------------------: | :-----------------------: | :------------: | :-----------------: |
|            index             |                            索引，提供排序用                             |          Number           |       --       |         --          |
|           children           |                               是否是子代                                |          Boolean          |       --       |        false        |
|          keepAlive           |        是否缓存页面，1：一直缓存 2：前进刷新，后退缓存 0：不缓存        |          Number           |     0/1/2      |          0          |
| navigationBarBackgroundColor |                             导航栏背景颜色                              |           Color           |       --       | $BACKGROUND--AVTIVE |
|    navigationBarTextStyle    |                     导航栏标题颜色及状态栏前景颜色                      |           Color           |       --       |     $FONTCOLOR      |
|    navigationBarTitleText    |                           导航栏标题文字内容                            |          String           |       --       |         --          |
| navigationBarTitleTextStyle  | 导航栏标题文字内容样式，仅支持 default/auto。auto即横屏展示，竖屏不展示 |          String           |  default/auto  |       default       |
|       navigationStyle        |     导航栏样式，仅支持 default/custom。custom即取消默认的原生导航栏     |          String           | default/custom |       default       |
|        navigationLeft        |                             导航栏左侧按钮                              | [Object](#navigationLeft) |       --       |         --          |
|        fixedFontSize         |                   字体不跟随系统字体大小而改变的路由                    |          String           |    Boolean     |         --          |
|           backTop            |                            是否需要置顶按钮                             |          Boolean          |       --       |         --          |
|   backTopVisibilityHeight    |                置顶按钮显示的高度，需要配合 backTop 使用                |          Number           |       --       |         300         |

<a id="navigationLeft"></a>
### navigationLeft Options
| 参数  |            说明            |  类型  | 可选值 | 默认值  |
| :---: | :------------------------: | :----: | :----: | :-----: |
| type  |  按钮样式，svg，van-icon   | String |   --   |   --    |
| text  | 显示的内容，有type时不显示 | String |   --   |   --    |
| color |            颜色            | Color  |   --   | inherit |
| size  |            大小            | Rem/Px |   --   | inherit |`,
    };
  },
  mounted() {},
  components: {
    mavonEditor,
  },
};
</script>

<style lang="scss" scoped>
.markdown {
  width: 100%;
  height: 100%;
}
</style>
