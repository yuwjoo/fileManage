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
 * @description: 获取资源列表
 * @param {object} params 参数
 * @return {promise<any>} 返回结果
 */
export function selectResourceList(params?: { [key: string]: any }): Promise<any> {
  return request('getResourceList', params);
}
