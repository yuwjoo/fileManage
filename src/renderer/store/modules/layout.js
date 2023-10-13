export default {
  namespaced: true,
  state: {
    openSidebar: localStorage.getItem("openSidebar") === "1", // 展开侧边栏
  },
  getters: {
    // 菜单列表
    menuList(state, getters, rootState, rootGetters) {
      return rootGetters["router/layoutRoutes"]
        .filter((route) => Number.isFinite(route.meta?.order))
        .sort((a, b) => a.meta.order - b.meta.order);
    },
  },
  mutations: {
    /**
     * @description: 设置是否展开侧边栏
     * @param {Object} state 状态
     * @param {Boolean} value 是否展开
     */
    setOpenSidebar(state, value) {
      state.openSidebar = value;
      localStorage.setItem("openSidebar", value ? "1" : "0");
    },
  },
};
