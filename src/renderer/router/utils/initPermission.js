/**
 * @description: 设置路由权限
 * @param {Object} Router 路由示例
 */
function setPermission(Router) {
  Router.beforeEach((to, from, next) => {
    next();
  });

  Router.afterEach(() => {});
}

export default setPermission;
