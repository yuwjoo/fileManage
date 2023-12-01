import { useElectron } from '@/hooks/electron';
import type { Options } from '@/types/hooks/request';

const electron = useElectron();

/**
 * @description: 发送请求
 * @param {Options} options 请求配置
 * @return {promise<unknown>} 响应
 */
export async function useRequest(options: Options): Promise<unknown> {
  if(useElectron().isElectronEnv) {
    
  }
  if (electron.isElectronEnv) {
    return new Promise((resolve, reject) => {
      electron
        .request(options.url, options.params)
        .then(resolve)
        .catch((err) => {
          ElNotification({
            title: '失败',
            message: err || '请求失败',
            type: 'error',
            position: 'bottom-right'
          });
          reject(err);
        });
    });
  } else {
    return Promise.reject();
  }
}
