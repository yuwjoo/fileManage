<template>
  <div class="markdown">
    <markdown-navbar
      v-model="currentGuide"
      :list="guideList"
      @change="getData"
    />
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
import markdownNavbar from "./components/markdownNavbar";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  name: "markdown",
  data() {
    return {
      guideList: [], // 指南列表
      currentGuide: "", // 当前选中的指南
      content: "", // 内容
    };
  },
  created() {
    this.getGuideList().then(this.getData);
  },
  methods: {
    /**
     * @name: 获取数据
     */
    getData() {
      this.$electron
        .getDataGuideContent({
          title: this.$route.query.title,
          guide: this.currentGuide,
        })
        .then((res) => {
          this.content = res;
        });
    },
    /**
     * @name: 获取指南列表
     * @return {promise}
     */
    getGuideList() {
      return this.$electron
        .getDataGuideList(this.$route.query.title)
        .then((res) => {
          this.guideList = res || [];
          if (!this.currentGuide) this.currentGuide = this.guideList[0].name;
        });
    },
  },
  components: {
    mavonEditor,
    markdownNavbar,
  },
};
</script>

<style lang="scss" scoped>
.markdown {
  width: 100%;
  height: 100%;
}
</style>
