module.exports = {
  /**
   * @description: 窗口最大化状态改变
   * @param {Object} win 窗口对象
   * @param {Boolean} isMaximize 是否最大化
   */
  changeMaximize(win, isMaximize) {
    win.webContents.send("changeMaximize", isMaximize);
  },
  /**
   * @description: 窗口全屏状态改变
   * @param {Object} win 窗口对象
   * @param {Boolean} isFull 是否全屏
   */
  changeFullScreen(win, isFull) {
    win.webContents.send("changeFullScreen", isFull);
  },
};
