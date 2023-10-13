export default {
  path: "sourceMaterial",
  name: "sourceMaterial",
  component: () =>
    import(/* webpackChunkName: "sourceMaterial" */ "@/views/sourceMaterial"),
  meta: {
    title: "素材",
    icon: "el-icon-film",
    order: 4,
  },
};
