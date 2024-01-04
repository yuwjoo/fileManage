import type { RequestIPCPostMessage } from "@/types/preload";
import { ipcMain } from "electron";
import { Category, Resource } from "@/sqlite/sqlite";
import { excludeEmptyValue } from "@/utils/utils";

const requestList = {
  /**
   * @description: 查询分类列表
   * @param {Electron.IpcMainEvent} event 事件对象
   * @param {any} params 配置
   */
  categorySelectCategoryList(event: Electron.IpcMainEvent, params: any) {
    return Category.findAll({
      where: excludeEmptyValue(params || {}),
      raw: true,
    });
  },
  /**
   * @description: 保存分类数据
   * @param {Electron.IpcMainEvent} event 事件对象
   * @param {any} params 配置
   */
  categorySaveCategoryData(event: Electron.IpcMainEvent, params: any) {
    if (params?.id) {
      return Category.update(
        {
          directory: params.directory,
          name: params.name,
        },
        { where: { id: params.id } }
      ).then(() => params);
    } else {
      return Category.create({
        directory: params.directory,
        name: params.name,
      }).then((res) => res.dataValues);
    }
  },
  /**
   * @description: 删除分类数据
   * @param {Electron.IpcMainEvent} event 事件对象
   * @param {any} params 配置
   */
  categoryDeleteCategoryData(event: Electron.IpcMainEvent, params: any) {
    return Category.destroy({ where: { id: params.id } });
  },
  /**
   * @description: 查询资源列表
   * @param {Electron.IpcMainEvent} event 事件对象
   * @param {any} params 配置
   */
  resourceSelectResourceList(event: Electron.IpcMainEvent, params: any) {
    return Promise.all([
      Resource.findAll({
        where: excludeEmptyValue(params || {}),
        raw: true,
      }),
      Category.findAll({ raw: true }),
    ]).then(([resourceRes, categoryRes]) => {
      return resourceRes.map((item: any) => ({
        ...item,
        tagList: JSON.parse(item.tags),
        resourceList: JSON.parse(item.resources),
        readmeList: JSON.parse(item.readmes),
        categoryName: (
          categoryRes.find((v: any) => v.id === item.categoryId) as any
        )?.name,
      }));
    });
  },
  /**
   * @description: 保存资源数据
   * @param {Electron.IpcMainEvent} event 事件对象
   * @param {any} params 配置
   */
  resourceSaveResourceData(event: Electron.IpcMainEvent, params: any) {
    if (params.id) {
      return Resource.update(
        {
          name: params.name,
          describe: params.describe,
          tags: JSON.stringify(params.tagList || []),
          resources: JSON.stringify(params.resourceList || []),
          readmes: JSON.stringify(params.readmeList || []),
          categoryId: params.categoryId,
        },
        { where: { id: params.id } }
      ).then(() => params);
    } else {
      return Resource.create({
        name: params.name,
        describe: params.describe,
        tags: JSON.stringify(params.tagList || []),
        resources: JSON.stringify(params.resourceList || []),
        readmes: JSON.stringify(params.readmeList || []),
        categoryId: params.categoryId,
      }).then((res) => res.dataValues);
    }
  },
  /**
   * @description: 删除资源数据
   * @param {Electron.IpcMainEvent} event 事件对象
   * @param {any} params 配置
   */
  resourceDeleteResourceData(event: Electron.IpcMainEvent, params: any) {
    return Resource.destroy({ where: { id: params.id } });
  },
} as Record<string, any>;

/**
 * @description: 请求 hook
 */
export function useRequest() {
  ipcMain.handle("request", (event, data: RequestIPCPostMessage) => {
    if (!requestList[data.name]) {
      console.error(`不存在的请求事件：${data.name}`);
      return;
    }
    return new Promise((resolve, reject) => {
      requestList[data.name](event, data.params)
        .then((res: any) => {
          resolve({
            code: 2000,
            data: res,
          });
        })
        .catch((err: any) => {
          reject({
            code: 4000,
            message: err,
          });
        });
    });
  });
}
