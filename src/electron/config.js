const { app } = require("electron");
const path = require("path");

module.exports = {
    appPath: app,
    workPath: path.resolve
}