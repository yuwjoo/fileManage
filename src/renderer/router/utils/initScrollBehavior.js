/**
 * @description: 滚动行为函数
 * @param {Object} to 目标路由
 * @param {Object} from 来源路由
 * @param {Object} savedPosition 上一次保存位置
 * @return {Object} 保存位置
 */
function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  } else {
    return { x: 0, y: 0 };
  }
}

export default () => scrollBehavior;
