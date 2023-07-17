const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const TerserPlugin = require("terser-webpack-plugin");
const packageJSON = require("../package.json");

const isProduction = process.env.NODE_ENV === "production"; // 生产环境

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: path.resolve(__dirname, "../src/renderer/main.js"),
  },
  output: {
    path: path.resolve(__dirname, "../dist/sources/renderer"),
    filename: "js/[name]-[contenthash].js",
    chunkFilename: "js/[name]-[chunkhash].js",
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
        test: /\.svg$/i,
        loader: "svg-sprite-loader",
        exclude: /node_modules/,
        options: {
          symbolId: "[name]",
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "image/[hash][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "font/[hash][ext]",
        },
      },
    ],
  },
  devtool: !isProduction ? "source-map" : undefined,
  plugins: [
    new HtmlWebpackPlugin({
      title: packageJSON.name,
      template: path.resolve(__dirname, "../public/index.html"),
      favicon: path.resolve(__dirname, "../public/favicon.ico"),
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/renderer"),
    },
    extensions: ["...", ".vue"],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false, //不将注释提取到单独的文件中
      }),
    ],
  },
};
