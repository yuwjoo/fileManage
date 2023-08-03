const { app } = require("electron");
const path = require("path");
const fs = require("fs");

const config = require("@/generate/config").getConfig(); // 全局配置信息
const workspacePath = path.resolve(app.getPath("exe"), '../', config.workspacePath); // 工作区路径
const indexPath = path.resolve(workspacePath, "./index.json"); // 索引路径

let indexData = []; // 索引数据

/**
 * @name: 获取索引数据
 * @return {array} 索引数据
 */
function getIndexData() {
  return JSON.parse(JSON.stringify(indexData));
}

/**
 * @name: 设置索引数据
 * @param {array} data 新的索引数据
 * @return {array} 索引数据
 */
function setIndexData(data) {
  fs.writeFileSync(indexPath, JSON.stringify(data), { encoding: "utf-8" });
  indexData = data;
  return data;
}

/**
 * @name: 初始化
 */
function init() {
  if (fs.existsSync(workspacePath)) {
    indexData = JSON.parse(fs.readFileSync(indexPath, { encoding: "utf-8" }));
  } else {
    fs.mkdirSync(workspacePath, { recursive: true });
    fs.writeFileSync(indexPath, "[]", { encoding: "utf-8" });
  }
}

init();

module.exports = {
  workspacePath,
  indexPath,
  getIndexData,
  setIndexData,
};
