export {};

export enum Use {
  axios, // axios环境下请求
  electron // electron环境下请求
}

export interface Options {
  use: Use[];
  url: string;
  method?: string;
  params?: Record<string, unknown>;
}
