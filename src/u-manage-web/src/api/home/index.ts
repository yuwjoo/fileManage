/**
 * @description: 获取类型列表
 * @param {any} data 请求参数
 * @param {Function} progress 进度回调函数
 * @return {Promise<any>} 请求结果
 */
export function getTypesList(data: any, progress?: Function): Promise<any> {
  return new Promise((a, b) => a());
  // return window.electronApi.request({
  //   url: "types/getTypesList",
  //   method: "post",
  //   progress,
  //   data,
  // });
}

/**
 * @description: 获取资源列表
 * @param {any} data 请求参数
 * @param {Function|undefined} progress 进度回调函数
 * @return {Promise<any>} 请求结果
 */
export function getResourceList(data: any, progress?: Function): Promise<any> {
  return new Promise((a, b) => a());
  // return window.electronApi.request({
  //   url: "types/getResourceList",
  //   method: "post",
  //   progress,
  //   data,
  // });
}
