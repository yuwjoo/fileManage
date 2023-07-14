const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production"; // 生产环境
const baseConfig = {
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, "../dist/sources"),
    filename: "[name].js",
    chunkFilename: "[name]-[chunkhash].js",
  },
  devtool: !isProduction ? "source-map" : undefined,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/electron"),
    },
  },
  plugins: [],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false, //不将注释提取到单独的文件中
      }),
    ],
  },
};

module.exports = [
  {
    ...baseConfig,
    target: "electron-main",
    entry: {
      main: path.resolve(__dirname, "../src/electron/main.js"),
    },
  },
  {
    ...baseConfig,
    target: "electron-preload",
    entry: {
      preload: path.resolve(__dirname, "../src/electron/preload.js"),
    },
  },
];
