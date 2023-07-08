import { Button, Select } from "element-ui";

export function useElementUI(Vue) {
  Vue.component(Button.name, Button);
  Vue.component(Select.name, Select);
}
