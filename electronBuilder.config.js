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
  files: [
    "!node_modules/**",
    "package.json",
    {
      from: "dist/sources",
    },
  ],
  electronDownload: {
    mirror: "https://mirrors.huaweicloud.com/electron/",
  },
};
