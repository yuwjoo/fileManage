process.env.NODE_ENV = "production";

const chalk = require("chalk"); // 控制台输出带颜色的文字
const webpack = require("webpack");
const webpackRendererConfig = require("./webpack.renderer.config");
const webpackMainConfig = require("./webpack.main.config");
const { spawn } = require('child_process')
const electron = require('electron')
const path = require("path")

startElectron();
function startElectron () {
  let electronProcess = spawn(electron, [
    path.resolve(__dirname, "../src/main/main.js")
  ])

  electronProcess.stdout.on('data', data => {
    electronLog(data, '----blue')
  })
  electronProcess.stderr.on('data', data => {
    electronLog(data, '----red')
  })

  electronProcess.on('close', () => {
    // process.exit()
  })
}

function electronLog (data, color) {
  let log = ''
  data = data.toString().split(/\r?\n/)
  data.forEach(line => {
    log += `  ${line}\n`
  })
  if (/[0-9A-z]+/.test(log)) {
    console.log(
      chalk[color].bold('┏ Electron -------------------') +
      '\n\n' +
      log +
      chalk[color].bold('┗ ----------------------------') +
      '\n'
    )
  }
}
return;


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
    console.log(err);
  } else {
    webpack(webpackMainConfig, (err, stats) => {
      if (err || stats.hasErrors()) {
        console.log(err);
      } else {
        console.log("打包成功");
      }
    });
  }
});
