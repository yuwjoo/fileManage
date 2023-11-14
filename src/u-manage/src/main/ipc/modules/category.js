const { api } = require("@/main/sqlite");

exports.listener = {};

exports.request = {
  /**
   * @description: 查询分类列表
   * @param {Object} event 事件对象
   * @param {Object} options 配置
   */
  ["category:selectCategoryList"](event, options) {
    return api.selectCategoryList();
  },
  /**
   * @description: 保存分类数据
   * @param {Object} event 事件对象
   * @param {Object} options 配置
   */
  ["category:saveCategoryData"](event, options) {
    const data = options.params;
    if (data.id) {
      return api.updateCategory(data);
    } else {
      return api.insertCategory(data);
    }
  },
  /**
   * @description: 删除分类数据
   * @param {Object} event 事件对象
   * @param {Object} options 配置
   */
  ["category:deleteCategoryData"](event, options) {
    const { id } = options.params;
    return api.deleteCategory(id);
  },
};

exports.connect = {};
