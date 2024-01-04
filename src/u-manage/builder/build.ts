import * as electronBuilder from "electron-builder";
import electronBuilderConfig from "~/electron-builder.config";
import webpack from "webpack";
import webpackConfig from "~/webpack.config";

/**
 * @description: 入口函数
 */
function main() {
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

    electronBuilder.build({ config: electronBuilderConfig });
  });
}

main();
