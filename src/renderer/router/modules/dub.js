export default {
  path: "dub",
  name: "dub",
  component: () => import(/* webpackChunkName: "dub" */ "@/views/dub"),
  meta: {
    title: "配音",
    icon: "el-icon-microphone",
    order: 1
  },
};
