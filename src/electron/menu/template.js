const { BrowserWindow } = require("electron");

module.exports = [
  {
    label: "新增",
    click: () => {
      BrowserWindow.getFocusedWindow().webContents.send("new-data");
    },
  },
];
