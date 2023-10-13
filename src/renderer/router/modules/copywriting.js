export default {
  path: "copywriting",
  name: "copywriting",
  component: () =>
    import(/* webpackChunkName: "copywriting" */ "@/views/copywriting"),
  meta: {
    title: "文案",
    icon: "el-icon-edit-outline",
    order: 1
  },
  children: [
    {
      path: "ai",
      name: "ai",
      component: () =>
        import(
          /* webpackChunkName: "copywriting" */ "@/views/copywriting/children/ai"
        ),
      meta: {
        title: "AI编写",
      },
    },
  ],
};
