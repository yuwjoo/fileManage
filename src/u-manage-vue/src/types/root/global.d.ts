import type { Electron, ElectronApi } from '@/types/hooks/electron';

export {};

declare module 'vue' {
  interface ComponentCustomProperties {
    $electron: Electron;
  }
}

declare global {
  interface Window {
    electronApi: ElectronApi;
  }
}
