import { useElectron } from '@/hooks/electron';

const electron = useElectron();

/**
 * @description: 发送请求
 * @param {array} arg 参数
 * @return {promise<any>} 结果
 */
export function request(...arg) {
  if (electron.isElectronEnv) {
    return electron.request(...arg);
  } else {
    return Promise.reject();
  }
}
