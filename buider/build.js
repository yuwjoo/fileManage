process.env.NODE_ENV = "production";

const chalk = require("chalk"); // 控制台输出带颜色的文字
const webpack = require("webpack");
const webpackRendererConfig = require("./webpack.renderer.config"); // 渲染进程配置
const webpackMainConfig = require("./webpack.main.config"); // 主进程配置

// 输出打包进度插件
const progressPlugin = new webpack.ProgressPlugin(
  (percentage, message, ...args) => {
    console.log(
      chalk.cyan(`${Math.floor(percentage * 100)}%`),
      message,
      ...args
    );
  }
);
webpackRendererConfig.plugins.push(progressPlugin);
webpackMainConfig.plugins.push(progressPlugin);

webpack(webpackRendererConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log("渲染进程编译出错", err);
  } else {
    webpack(webpackMainConfig, (err, stats) => {
      if (err || stats.hasErrors()) {
        console.log("主进程编译出错", err);
      }
    });
  }
});
