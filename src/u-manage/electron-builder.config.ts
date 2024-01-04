import * as electronBuilder from "electron-builder";
import { name, version } from "./package.json";

export default {
  appId: "com.umanage.app",
  productName: name,
  directories: {
    output: `dist/release-v${version}/`,
  },
  asar: false,
  extraMetadata: {
    main: "app.js",
  },
  files: ["package.json", { from: "dist/source/" }],
  electronDownload: {
    mirror: "https://npm.taobao.org/mirrors/electron/",
  },
} as electronBuilder.CliOptions["config"];
