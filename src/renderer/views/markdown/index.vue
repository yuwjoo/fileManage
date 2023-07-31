<template>
  <div class="markdown">
    <mavon-editor
      ref="md"
      v-model="content"
      previewBackground="var(--theme-color)"
      boxShadowStyle="0 2px 12px 0 transparent"
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
  name: "markdown",
  data() {
    return {
      content: `[返回](/README.md)

## OrganizationList 组件说明


### 说明
通过search属性传入请求参数即可使用。或者设置autoLoad=false, 通过ref手动调用内部getData函数进行列表初始化。可选择性扩展：v-model绑定父级id或是当前选中项id；paramId.sync绑定当前组织架构类型id； topOrgId.sync绑定当前事业部id。相关事件触发见文档

### OrganizationList Attributes
|        参数        |                                     说明                                     |     类型      | 可选值 | 默认值 |
| :----------------: | :--------------------------------------------------------------------------: | :-----------: | :----: | :----: |
|   value/v-model    |                                当前组织架构id                                | String Number |   --   |   --   |
|      paramId       |                        当前组织架构类型id (.sync修饰)                        | String Number |   --   |   --   |
|      topOrgId      |                           当前事业部id (.sync修饰)                           | String Number |   --   |   --   |
|       title        |                                   头部标题                                   |    String     |   --   |   --   |
|      subTitle      |                                  头部副标题                                  |    String     |   --   |   --   |
|       search       |             既是接口请求的默认参数，也是下钻时带在链接后面的参数             |    Object     |   --   |   {}   |
|      loading       |                                   加载状态                                   |    Boolean    |   --   |   --   |
|      autoLoad      |                             首次进入自动请求数据                             |    Boolean    |   --   |   --   |
|      reverse       |                                   是否反选                                   |    Boolean    |   --   |  true  |
| levelRouteNameList | 层级路由名称列表, key为层级，value为route.name, 例：{ 1: "threeIndicators" } |    Object     |   --   |   {}   |

### OrganizationList item Attributes<a id="item"></a>
|    参数     |                   说明                   |  类型  | 可选值 | 默认值 |
| :---------: | :--------------------------------------: | :----: | :----: | :----: |
|    title    | 展示的标题（一般是在页面的顶部进行展示） | String |   --   |   --   |
|    label    |                   名称                   | String |   --   |   --   |
|  subLabel   |                  副名称                  | String |   --   |   --   |
|   number    |                 底部数值                 | String |   --   |   --   |
|    value    |              选中时绑定的值              | String |   --   |   --   |
|    level    |                 当前层级                 | String |   --   |   --   |
| parentLevel |                 父级层级                 | String |   --   |   --   |
|    item     |                 原始数据                 | Object |   --   |   --   |

### OrganizationList paramItem Attributes<a id="paramItem"></a>
| 参数  |   说明   |  类型  | 可选值 | 默认值 |
| :---: | :------: | :----: | :----: | :----: |
| label |   名称   | String |   --   |   --   |
| value |  绑定值  | String |   --   |   --   |
| item  | 原始数据 | Object |   --   |   --   |

### OrganizationList Events
|    事件名称     |                     说明                      |               回调参数               |
| :-------------: | :-------------------------------------------: | :----------------------------------: |
|      init       | 数据初始化完成（只在autoLoad=true时才会触发） |                  --                  |
|     change      |            用户改变当前组织架构id             |   { value, index, [item](#item) }    |
|     active      |              当前组织架构id改变               |   { value, index, [item](#item) }    |
| change-paramId  |            用户改变组织架构类型id             | { value, index, [item](#paramItem) } |
| active-paramId  |              组织架构类型id改变               | { value, index, [item](#paramItem) } |
| active-topOrgId |                当前事业部改变                 |                value                 |
|  active-parent  |             当前组织架构父级信息              |            [item](#item)             |

### OrganizationList Methods
| 方法名称 |                          说明                           | 参数  |
| :------: | :-----------------------------------------------------: | :---: |
| getData  | 获取数据，可传入接口请求参数, 默认 this.search 属性数据 |

### OrganizationList Slots
| 插槽名称 |   说明   |     参数     |
| :------: | :------: | :----------: |
|  title   | 顶部标题 |  { title }   |
| subTitle |  副标题  | { subTitle } |

### OrganizationList item Slots
| 插槽名称 |    说明    |                参数                |
| :------: | :--------: | :--------------------------------: |
|  label   |  item标题  |  { label, index, [item](#item) }   |
| subLabel | item副标题 | { subLabel, index, [item](#item) } |
|  number  |  item数值  |  { number, index, [item](#item) }  |`,
    };
  },
  mounted() {
    console.log("挂载");
  },
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
