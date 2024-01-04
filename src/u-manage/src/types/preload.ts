export {};

/** 监听事件 */
export type ListenerCallback = (data: any) => void;
export type ListenerOptions = { immediate?: boolean } | undefined;
export type ListenerReturn = { remove: () => void };
export type ListenerIPCPostMessage = { name: string; options: ListenerOptions };
export type ListenerPortPostMessage = { type: string; data: any };

/** 执行动作 */
export type ActionOptions = Record<string, any> | undefined;
export type ActionIPCPostMessage = { name: string; options: ActionOptions };

/** 发送请求 */
export type RequestParams = Record<string, any> | undefined;
export type RequestReturn = Promise<any>;
export type RequestIPCPostMessage = { name: string; params: RequestParams };
