import type { useElectron } from '@/hooks/electron';

export {};

export type UseElectronReturn = ReturnType<typeof useElectron>;

export type ListenerCallback = (data: any) => void;

export type ListenerOptions = {
  immediate?: boolean; // 监听后立即执行一次
};

export type ListenerReturn = {
  remove: () => void; // 移除事件
};

export type ActionOptions = Record<string, any>;

export type RequestParams = Record<string, any>;

export type ConnectParams = Record<string, any>;

export type ConnectOptions = {
  onmessage?: (data: any) => void; // 消息回调
  onerror?: (data: ConnectErrorData, options: ConnectionOptions) => void; // 异常回调
  onclose?: () => void; // 关闭回调
};

export type ConnectReturn = {
  send: (data: any) => void; // 发送消息
  close: () => void; // 关闭
};

export type ConnectErrorData = {
  code: number; // 异常代码
  msg: string; // 消息
};

export type Listener = (
  name: string,
  callback: ListenerCallback,
  options?: ListenerOptions
) => ListenerReturn;

export type Action = (name: string, options?: ActionOptions) => void;

export type Request = (name: string, params?: RequestParams) => Promise<any>;

export type Connect = (
  name: string,
  params?: ConnectParams,
  options?: ConnectOptions
) => ConnectReturn;

export interface ElectronApi {
  version: string; // electron版本号
  listener: Listener; // 添加事件监听
  action: Action; // 执行动作
  request: Request; // 发送请求
  connect: Connect; // 创建连接
}
