export {};

export interface ElectronApi {
  version: string;
  addListener: (
    name: string,
    callback: (data: any) => void,
    options?: ListenerOptions
  ) => CallbackOptions;
  request: (name: string, params?: Record<string, unknown>) => Promise<any>;
  connect: (
    name: string,
    params?: Record<string, unknown>,
    options?: ConnectOptions
  ) => ConnectionOptions;
}

export interface Electron {
  electronApi?: ElectronApi;
  isElectronEnv: boolean;
  listener: (name: string, callback: (data: any) => void, options?: ListenerOptions) => void;
  request: (name: string, params?: Record<string, unknown>) => Promise<any>;
  connect: (
    name: string,
    params?: Record<string, unknown>,
    options?: ConnectOptions
  ) => ConnectionOptions;
}

export interface CallbackOptions {
  remove: () => void;
}

export interface ConnectionOptions {
  send: (data: any) => void;
  close: () => void;
}

export interface ListenerOptions {
  immediate?: boolean;
}

export interface ConnectOptions {
  onmessage?: (data: any) => void;
  onerror?: (data: ErrorData, options: ConnectionOptions) => void;
  onclose?: () => void;
}

export interface ErrorData {
  code: number;
  msg: string;
}
