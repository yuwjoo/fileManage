import type { DefineComponent } from 'vue';

export {};

export interface MenuItem {
  icon: DefineComponent;
  title: string;
  command: string;
}
