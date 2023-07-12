process.env.NODE_ENV = "development";

const chalk = require("chalk"); // 控制台输出带颜色的文字
const electron = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const webpack = require("webpack");
const webpackRendererConfig = require("./webpack.renderer.config"); // 网页端配置
const webpackElectronConfig = require("./webpack.electron.config"); // 桌面端配置
const WebpackDevServer = require("webpack-dev-server");

let electronProcess = null; // 桌面端服务进程
let reloadElectron = false; // 桌面端进程重启中

/**
 * @name: 启动网页端服务
 * @return {promise} 处理promise
 */
function startRenderer() {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackRendererConfig);
    const server = new WebpackDevServer(
      {
        host: "127.0.0.1",
        port: 9091,
        hot: true,
        liveReload: true,
        compress: true,
        setupMiddlewares(middlewares, devServer) {
          devServer.middleware.waitUntilValid(() => {
            console.log("网页端监听成功");
            resolve();
          });
          return middlewares;
        },
      },
      compiler
    );
    server.start();
  });
}

/**
 * @name: 启动桌面端服务
 * @return {promise} 处理promise
 */
function startElectron() {
  electronProcess = spawn(electron, [
    path.resolve(__dirname, "../dist/sources/main.js"),
  ]);

  electronProcess.stdout.on("data", (data) => {
    electronLog(data, "blue");
  });
  electronProcess.stderr.on("data", (data) => {
    electronLog(data, "red");
  });

  electronProcess.on("close", () => {
    if (!reloadElectron) process.exit();
    reloadElectron = false;
  });
}

/**
 * @name: 编译electron代码
 * @return {promise} 处理promise
 */
function compileElectron() {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackElectronConfig);

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("监听改变");
        if (electronProcess && electronProcess.kill) {
          reloadElectron = true;
          process.kill(electronProcess.pid);
          electronProcess = null;
          startElectron();
        }
        console.log("桌面端监听成功");
        resolve();
      }
    });
  });
}

/**
 * @name: 输出electron日志
 * @param {*} data 
 * @param {*} color 
 * @return {*}
 */
function electronLog(data, color) {
  let log = "";
  data = data.toString().split(/\r?\n/);
  data.forEach((line) => {
    log += `  ${line}\n`;
  });
  if (/[0-9A-z]+/.test(log)) {
    console.log(
      chalk[color]("┏ Electron -------------------") +
        "\n\n" +
        log +
        chalk[color]("┗ ----------------------------") +
        "\n"
    );
  }
}

Promise.all([startRenderer(), compileElectron()])
  .then(() => {
    console.log("开始启动");
    startElectron();
  })
  .catch((err) => {
    console.log("启动失败", err);
  });
