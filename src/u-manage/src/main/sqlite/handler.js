const db = require("./db");

/**
 * @description: 运行sql
 * @param {String} sql sql语句
 * @param {Array} params 参数
 * @return {Promise} 结果
 */
function run(sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * @description: 查询sql结果
 * @param {String} sql sql语句
 * @param {Array} params 参数
 * @return {Promise} 结果
 */
function all(sql, params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

/**
 * @description: 开启事务
 * @param {Function} callback 回调函数
 * @return {Promise} 结果
 */
async function transaction(callback) {
  db.run("BEGIN;");
  try {
    await new Promise(callback);
    db.run("COMMIT;");
  } catch {
    db.run("ROLLBACK;");
  }
}

module.exports = { run, all, transaction };