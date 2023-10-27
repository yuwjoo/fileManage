const { run, all } = require("./handler");

module.exports = {
  /**
   * @description: 添加类型数据
   * @param {Object} data 数据
   * @return {Promise} 结果
   */
  addTypes(data) {
    return run(`INSERT INTO types (directory, title) VALUES (?, ?);`, [
      data.directory,
      data.title,
    ]);
  },
  /**
   * @description: 删除类型数据
   * @param {String} id 类型id
   * @return {Promise} 结果
   */
  deleteTypes(id) {
    return run(`DELETE FROM types WHERE id=?;`, [id]);
  },
  /**
   * @description: 修改类型数据
   * @param {Object} data 数据
   * @return {Promise} 结果
   */
  updateTypes(data) {
    return run(`UPDATE types SET title=?, directory=? WHERE id=?;`, [
      data.title,
      data.directory,
      data.id,
    ]);
  },
  /**
   * @description: 查询类型数据列表
   * @return {Promise} 结果
   */
  getTypesList() {
    return all(`SELECT * FROM types;`);
  },
  /**
   * @description: 添加资源数据
   * @param {Object} data 数据
   * @return {Promise} 结果
   */
  addResource(data) {
    return run(
      `INSERT INTO resource (title, describe, types_id) VALUES (?, ?, ?);`,
      [data.title, data.describe, data.types_id]
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
      `UPDATE resource SET title=?, describe=?, types_id=? WHERE id=?;`,
      [data.title, data.describe, data.types_id, data.id]
    );
  },
  /**
   * @description: 查询资源数据列表
   * @return {Promise} 结果
   */
  getResourceList() {
    return all(`SELECT * FROM resource;`);
  },
};
