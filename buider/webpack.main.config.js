const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production"; // 生产环境

module.exports = {
  mode: process.env.NODE_ENV,
  target: "electron-main",
  entry: {
    main: path.resolve(__dirname, "../src/main/main.js"),
  },
  output: {
    path: path.resolve(__dirname, "../dist/electron"),
    filename: "[name].js",
    chunkFilename: "[name]-[chunkhash].js",
    clean: true,
  },
  devtool: !isProduction ? "source-map" : undefined,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/main"),
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
