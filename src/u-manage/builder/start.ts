import {
  type ChildProcessWithoutNullStreams,
  spawn,
  exec,
} from "child_process";
import treeKill from "tree-kill";
import electron from "electron";
import webpack from "webpack";
import webpackConfig from "~/webpack.config";

class ElectronApp {
  argv: string[];
  appProcess?: ChildProcessWithoutNullStreams;

  constructor(argv = [".", "--no-sandbox"]) {
    this.argv = argv;
    process.once("exit", () => {
      this.exit();
      this.appProcess?.kill();
    });
  }

  /**
   * @description: 启动 Electron 应用程序
   */
  startup() {
    this.exit();
    this.appProcess = spawn(electron as any, this.argv, { stdio: "inherit" });
    this.appProcess.once("exit", process.exit);
  }

  /**
   * @description: 退出 Electron 应用程序
   */
  exit() {
    if (!this.appProcess) return;
    this.appProcess.removeAllListeners();
    treeKill(
      this.appProcess?.pid,
      "SIGKILL",
      (error) => error && this.appProcess?.kill()
    );
  }
}

/**
 * @description: 入口函数
 */
function main() {
  const electronApp = new ElectronApp(["./dist/source/app.js"]);

  exec("chcp 65001", () => {
    if (process.argv.some((s) => s === "--watch")) {
      webpack(webpackConfig).watch({}, (err) => {
        if (err) {
          console.error(err.message);
          return;
        }
        electronApp.startup();
      });
    } else {
      webpack(webpackConfig, (err, stats) => {
        if (err) {
          console.error(err.stack || err);
          if ((err as any).details) {
            console.error((err as any).details);
          }
          return;
        }

        const info = stats.toJson();

        if (stats.hasErrors()) {
          console.error(info.errors);
        }

        if (stats.hasWarnings()) {
          console.warn(info.warnings);
        }

        electronApp.startup();
      });
    }
  });
}

main();
