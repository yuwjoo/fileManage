const db = require("./db");
const { run, all, transaction } = require("./handler");

const api = {
  /**
   * @description: 添加分类数据
   * @param {Object} data 数据
   * @return {Promise} 结果
   */
  insertCategory(data) {
    return run(`INSERT INTO category (directory, name) VALUES (?, ?);`, [
      data.directory,
      data.name,
    ]);
  },
  /**
   * @description: 删除分类数据
   * @param {String} id 分类id
   * @return {Promise} 结果
   */
  deleteCategory(id) {
    return run(`DELETE FROM category WHERE id=?;`, [id]);
  },
  /**
   * @description: 修改分类数据
   * @param {Object} data 数据
   * @return {Promise} 结果
   */
  updateCategory(data) {
    return run(`UPDATE category SET name=?, directory=? WHERE id=?;`, [
      data.name,
      data.directory,
      data.id,
    ]);
  },
  /**
   * @description: 查询分类数据列表
   * @param {String} id 分类id
   * @return {Promise} 结果
   */
  selectCategoryList(id) {
    return all(`SELECT * FROM category WHERE id==?;`, [id]);
  },
  /**
   * @description: 添加资源数据
   * @param {Object} data 数据
   * @return {Promise} 结果
   */
  insertResource(data) {
    return run(
      `INSERT INTO resource (name, describe, tags, category_id) VALUES (?, ?, ?, ?);`,
      [data.name, data.describe, (data.tags || []).join(","), data.category_id]
    );
  },
  /**
   * @description: 删除资源数据
   * @param {String} id 资源id
   * @return {Promise} 结果
   */
  deleteResource(id) {
    return run(`DELETE FROM resource WHERE id=?;`, [id]);
  },
  /**
   * @description: 修改资源数据
   * @param {Object} data 数据
   * @return {Promise} 结果
   */
  updateResource(data) {
    return run(
      `UPDATE resource SET name=?, describe=?, tags=?, category_id=? WHERE id=?;`,
      [
        data.name,
        data.describe,
        (data.tags || []).join(","),
        data.category_id,
        data.id,
      ]
    );
  },
  /**
   * @description: 查询资源数据列表
   * @param {Object} data 筛选条件
   * @return {Promise} 结果
   */
  selectResourceList(data) {
    return all(
      `SELECT * FROM resource
       WHERE name link "%${data.searchContent}%" or describe link "%${data.searchContent}%";`
    );
  },
};

module.exports = { api, db, run, all, transaction };
