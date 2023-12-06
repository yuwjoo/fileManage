export {};

export interface Options {
  requestType: 'axios' | 'electron' | 'auto';
  url: string;
  method?: string;
  params?: Record<string, any>;
}
