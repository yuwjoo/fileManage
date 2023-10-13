export default {
  path: "publish",
  name: "publish",
  component: () => import(/* webpackChunkName: "publish" */ "@/views/publish"),
  meta: {
    title: "发布",
    icon: "el-icon-position",
    order: 6
  },
};
