export {};

export enum Code {
  success = 2000, // 请求成功
  fail = 4000 // 请求失败
}

// 响应体结构
export interface ResponseBody<T> {
  code: Code;
  message: string;
  data: T;
}
