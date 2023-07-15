const { app } = require("electron");
const path = require("path");
const fs = require("fs");

const configPath = path.resolve(app.getAppPath(), "./config.json"); // 配置存放路径

const defaultConfig = {
  workspacePath: "./workspace", // 工作区目录
};

let localConfig = {}; // 本地配置文件数据

/**
 * @name: 获取config
 * @return {object} 当前配置
 */
function getConfig() {
  return { ...defaultConfig, ...localConfig };
}

/**
 * @name: 设置config
 * @param {object} config 新配置
 * @return {object} 当前配置
 */
function setConfig(config) {
  fs.writeFileSync(
    configPath,
    JSON.stringify({ ...defaultConfig, ...config }, null, 2),
    {
      encoding: "utf-8",
    }
  );
  localConfig = config;
  return getConfig();
}

/**
 * @name: 初始化
 */
function init() {
  if (fs.existsSync(configPath)) {
    localConfig = JSON.parse(
      fs.readFileSync(configPath, { encoding: "utf-8" })
    );
  } else {
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), {
      encoding: "utf-8",
    });
  }
}

init();

module.exports = {
  getConfig,
  setConfig,
};
