process.env.NODE_ENV = "production";

const chalk = require("chalk"); // 控制台输出带颜色的文字
const webpack = require("webpack");
const webpackRendererConfig = require("./webpack.renderer.config"); // 网页端配置
const webpackElectronConfig = require("./webpack.electron.config"); // 桌面端配置

// 输出打包进度插件
[webpackRendererConfig, ...webpackElectronConfig].forEach((config) => {
  config.plugins.push(
    new webpack.ProgressPlugin((percentage, message, ...args) => {
      console.log(
        chalk.cyan(`${Math.floor(percentage * 100)}%`),
        message,
        ...args
      );
    })
  );
});

/**
 * @name: 开始webpack编译
 * @param {object|array[object]} config 配置项
 * @return {promise} 返回处理程序
 */
function startCompiler(config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * @name: 初始化
 */
async function init() {
  try {
    await startCompiler(webpackElectronConfig);
  } catch (err) {
    console.log("桌面端编译出错", err);
  }

  try {
    await startCompiler(webpackRendererConfig);
  } catch (err) {
    console.log("网页端编译出错", err);
  }
}

init();
