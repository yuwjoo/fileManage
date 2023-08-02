const packageJSON = require("./package.json");

module.exports = {
  productName: packageJSON.name,
  directories: {
    output: "dist/build",
  },
  asar: true,
  extraMetadata: {
    main: "main.js",
  },
  extraResources: [
    // { from: "src/electron/config.js", to: "../config/config.js" },
  ],
  files: [
    "!node_modules/**",
    "package.json",
    {
      from: "dist/sources",
    },
  ],
  electronDownload: {
    mirror: "https://npm.taobao.org/mirrors/electron/",
  },
};
