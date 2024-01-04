import path from "path";
import webpack, { Configuration } from "webpack";
import nodeExternals from "webpack-node-externals";
import CopyPlugin from "copy-webpack-plugin";

export default {
  mode: "production",
  target: "electron-main",
  entry: {
    app: path.resolve(__dirname, "src/app.ts"),
    preload: path.resolve(__dirname, "src/preload.ts"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/source/"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, "./tsconfig.app.json"),
        },
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, "public/"), to: "./" }],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: [nodeExternals()],
  externalsPresets: { electronMain: true },
} as Configuration;
