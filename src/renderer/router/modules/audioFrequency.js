export default {
  path: "audioFrequency",
  name: "audioFrequency",
  component: () =>
    import(/* webpackChunkName: "audioFrequency" */ "@/views/audioFrequency"),
  meta: {
    title: "音频",
    icon: "el-icon-headset",
    order: 3
  },
};
