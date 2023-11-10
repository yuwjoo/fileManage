import type { Electron } from '@/hooks/electron';

declare module 'vue' {
  declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const vueComponent: DefineComponent<{}, {}, any>;
    export default vueComponent;
  }

  interface ComponentCustomProperties {
    $electron: Electron;
  }
}

declare global {
  interface Window {
    electronApi: any;
  }
}
