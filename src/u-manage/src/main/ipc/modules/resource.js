const { api } = require("@/main/sqlite");

exports.listener = {};

exports.request = {
  /**
   * @description: 查询资源列表
   * @param {Object} event 事件对象
   * @param {Object} options 配置
   */
  ["resource:selectResourceList"](event, options) {
    const params = options.params;
    return api.selectResourceList(params || {});
  },
  /**
   * @description: 保存资源数据
   * @param {Object} event 事件对象
   * @param {Object} options 配置
   */
  ["resource:saveResourceData"](event, options) {
    const data = options.params;
    if (data.id) {
      return api.updateResource(data);
    } else {
      return api.insertResource(data);
    }
  },
  /**
   * @description: 删除资源数据
   * @param {Object} event 事件对象
   * @param {Object} options 配置
   */
  ["resource:deleteResourceData"](event, options) {
    const id = options.params;
    return api.deleteResource(id);
  },
};

exports.connect = {};
