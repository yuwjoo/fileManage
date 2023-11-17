import { request } from '@/assets/js/interceptor';

/**
 * @description: 获取分类列表
 * @param {object} params 参数
 * @return {promise<any>} 返回结果
 */
export function selectCategoryList(params?: { [key: string]: any }): Promise<any> {
  return request('category:selectCategoryList', params);
}

/**
 * @description: 保存分类数据
 * @param {object} params 参数
 * @return {promise<any>} 返回结果
 */
export function saveCategoryData(params?: { [key: string]: any }): Promise<any> {
  return request('category:saveCategoryData', params);
}

/**
 * @description: 新增分类数据
 * @param {object} params 参数
 * @return {promise<any>} 返回结果
 */
export function insertCategoryData(params?: { [key: string]: any }): Promise<any> {
  return request('category:insertCategoryData', params);
}

/**
 * @description: 删除分类数据
 * @param {object} params 参数
 * @return {promise<any>} 返回结果
 */
export function deleteCategoryData(params?: { [key: string]: any }): Promise<any> {
  return request('category:deleteCategoryData', params);
}

/**
 * @description: 获取资源列表
 * @param {object} params 参数
 * @return {promise<any>} 返回结果
 */
export function selectResourceList(params?: { [key: string]: any }): Promise<any> {
  return request('resource:selectResourceList', params);
}
