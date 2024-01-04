import { useElectron } from '@/hooks/electron';
import type { Options } from '@/types/hooks/request';

/**
 * @description: 发送请求
 * @param {Options} options 请求配置
 * @return {promise<T>} 响应
 */
export async function useRequest<T>(options: Options): Promise<T> {
  const isAuto = options.requestType === 'auto';
  if ((isAuto || options.requestType === 'electron') && useElectron().isAvailable) {
    try {
      console.log(options);
      return await useElectron()
        .request(options.url, options.params)
        .then((res) => {
          console.log(options.url, res);
          return res;
        });
    } catch (err: any) {
      ElNotification({
        title: '失败',
        message: err || '请求失败',
        type: 'error',
        position: 'bottom-right'
      });
      return Promise.reject(err);
    }
  } else if (isAuto || options.requestType === 'axios') {
    return Promise.reject();
  } else {
    return Promise.reject();
  }
}
