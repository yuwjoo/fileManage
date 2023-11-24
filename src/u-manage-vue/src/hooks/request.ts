import { useElectron } from '@/hooks/electron';
import type { requestOptions } from '@/types/hooks/request';
import { ElNotification } from 'element-plus';

const electron = useElectron();

/**
 * @description: 发送请求
 * @param {requestOptions} options 请求配置
 * @return {promise<any>} 结果
 */
export async function useRequest(options: requestOptions): Promise<any> {
  if (electron.isElectronEnv) {
    return electron.request(options.url, options.params).catch((err) => {
      ElNotification({
        title: '失败',
        message: err || '请求失败',
        type: 'error'
      });
    });
  } else {
    return Promise.reject();
  }
}
