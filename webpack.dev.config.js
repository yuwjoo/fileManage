const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "app.js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "系统",
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      hash: true,
    }),
  ],
};
