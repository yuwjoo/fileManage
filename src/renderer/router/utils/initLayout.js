import layout from "@/layout";

/**
 * @description: 扁平化路由配置
 * @param {Array} routes 路由列表
 * @param {Object|Null} parent 父级
 * @return {Array} 扁平化路由列表
 */
function handleFlatRoutes(routes, parent) {
  if (!routes || routes.length === 0) return [];
  let routeList = [];
  for (let route of routes) {
    const newRoute = {
      ...route,
      path: [parent?.path, route.path].join("/"),
      meta: {
        ...route.meta,
        matched: parent ? parent.meta.matched.concat([route]) : [route],
      },
    };
    routeList.push(newRoute, ...handleFlatRoutes(route.children, newRoute));
    delete newRoute.children;
  }
  return routeList;
}

/**
 * @description: 生成页面路由配置
 * @return {Object} 路由配置
 */
function generateLayout() {
  const modules = require.context("@/router/modules", false, /\.js$/);
  const routes = modules.keys().map((key) => modules(key).default);
  const flatRoutes = handleFlatRoutes(routes, null);
  const redirectRoute =
    flatRoutes.find((route) => route.meta?.order === 1) || flatRoutes[0];
  return {
    path: "/",
    name: "layout",
    component: layout,
    redirect: redirectRoute,
    children: flatRoutes,
  };
}

export default generateLayout;
