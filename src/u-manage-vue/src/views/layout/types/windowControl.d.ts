import type { FunctionalComponent, SVGAttributes } from 'vue';

export {};

export interface WindowControlButtons {
  icon: FunctionalComponent<SVGAttributes, {}, any>;
  title: string;
  onclick: () => void;
}
