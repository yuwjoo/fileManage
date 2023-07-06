const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "app.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.s?css$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          outputPath: "image",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          outputPath: "font",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "系统",
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      hash: true,
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
