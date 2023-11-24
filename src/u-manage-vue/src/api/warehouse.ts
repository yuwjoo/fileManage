import { useRequest } from '@/hooks/request';
import type { CategoryListResponse, ResourceListResponse, ParamsType } from '@/types/api/warehouse';

/**
 * @description: 获取分类列表
 * @param {ParamsType} params 参数
 * @return {promise<CategoryListResponse>} 返回结果
 */
export function selectCategoryList(params?: ParamsType): Promise<CategoryListResponse> {
  return useRequest({
    url: 'category:selectCategoryList',
    method: 'get',
    params
  });
}

/**
 * @description: 保存分类数据
 * @param {ParamsType} params 参数
 * @return {promise<CategoryListResponse>} 返回结果
 */
export function saveCategoryData(params?: ParamsType): Promise<CategoryListResponse> {
  return useRequest({
    url: 'category:saveCategoryData',
    method: 'get',
    params
  });
}

/**
 * @description: 删除分类数据
 * @param {ParamsType} params 参数
 * @return {promise<CategoryListResponse>} 返回结果
 */
export function deleteCategoryData(params?: ParamsType): Promise<CategoryListResponse> {
  return useRequest({
    url: 'category:deleteCategoryData',
    method: 'get',
    params
  });
}

/**
 * @description: 获取资源列表
 * @param {ParamsType} params 参数
 * @return {promise<ResourceListResponse>} 返回结果
 */
export function selectResourceList(params?: ParamsType): Promise<ResourceListResponse> {
  return useRequest({
    url: 'resource:selectResourceList',
    method: 'get',
    params
  });
}
