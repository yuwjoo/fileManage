export default {
  path: "integration",
  name: "integration",
  component: () =>
    import(/* webpackChunkName: "integration" */ "@/views/integration"),
  meta: {
    title: "整合",
    icon: "el-icon-files",
    order: 5
  },
};
