const { Menu } = require("electron");
const template = require("./template");

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
