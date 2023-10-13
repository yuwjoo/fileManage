export default {
  namespaced: true,
  state: {
    routes: [], // 路由列表
  },
  getters: {
    // 页面路由列表
    layoutRoutes(state) {
      return (
        state.routes.find((route) => route.name === "layout")?.children || []
      );
    },
  },
  mutations: {
    /**
     * @description: 设置路由列表
     * @param {Object} state 状态
     * @param {Array} value 路由列表
     */
    setRoutes(state, value) {
      state.routes = value;
    },
  },
};
