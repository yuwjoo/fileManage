import { useRequest } from '@/hooks/request';
import type { ResponseBody } from '@/types/api/api';
import type { Category, Resource, ParamsType } from '@/types/api/warehouse';

/**
 * @description: 查询分类列表
 * @param {ParamsType} params 参数
 */
export function selectCategoryList(params?: ParamsType) {
  return useRequest<ResponseBody<Category[]>>({
    requestType: 'electron',
    url: 'categorySelectCategoryList',
    method: 'get',
    params
  });
}

/**
 * @description: 保存分类数据
 * @param {ParamsType} params 参数
 */
export function saveCategoryData(params?: ParamsType) {
  return useRequest<ResponseBody<Category>>({
    requestType: 'electron',
    url: 'categorySaveCategoryData',
    method: 'get',
    params
  });
}

/**
 * @description: 删除分类数据
 * @param {ParamsType} params 参数
 */
export function deleteCategoryData(params?: ParamsType) {
  return useRequest<ResponseBody<null>>({
    requestType: 'electron',
    url: 'categoryDeleteCategoryData',
    method: 'get',
    params
  });
}

/**
 * @description: 查询资源列表
 * @param {ParamsType} params 参数
 */
export function selectResourceList(params?: ParamsType) {
  return useRequest<ResponseBody<Resource[]>>({
    requestType: 'electron',
    url: 'resourceSelectResourceList',
    method: 'get',
    params
  });
}

/**
 * @description: 保存资源列表
 * @param {ParamsType} params 参数
 */
export function saveResourceData(params?: ParamsType) {
  return useRequest<ResponseBody<Resource>>({
    requestType: 'electron',
    url: 'resourceSaveResourceData',
    method: 'get',
    params
  });
}

/**
 * @description: 删除资源列表
 * @param {ParamsType} params 参数
 */
export function deleteResourceData(params?: ParamsType) {
  return useRequest<null>({
    requestType: 'electron',
    url: 'resourceDeleteResourceData',
    method: 'get',
    params
  });
}
