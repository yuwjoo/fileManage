const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, config) => {
  const isProduction = config.mode === "production"; // 生产环境

  return {
    entry: {
      app: "./src/main.js",
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
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
        title: "系统",
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
      }),
      new VueLoaderPlugin(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
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
};
