import type { ElectronApi, UseElectronReturn } from '@/types/hooks/electron';

export {};

declare module 'vue' {
  interface ComponentCustomProperties {
    $electron: UseElectronReturn;
  }
}

declare global {
  interface Window {
    electronApi: ElectronApi;
  }
}
