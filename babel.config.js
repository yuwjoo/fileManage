module.exports = {
  presets: ["@babel/preset-env", "@vue/babel-preset-jsx"],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
  ],
};
