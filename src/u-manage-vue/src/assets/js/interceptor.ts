import { useElectron } from '@/hooks/electron';

const electron = useElectron();

/**
 * @description: 发送请求
 * @param {string} name 名称
 * @param {{ [key: string]: any }} params 参数
 * @return {promise<any>} 结果
 */
export function request(name: string, params?: { [key: string]: any }) {
  if (electron.isElectronEnv) {
    return electron.request(name, params);
  } else {
    return Promise.reject();
  }
}
