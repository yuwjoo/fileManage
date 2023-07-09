import { Button, Select, Row, Col, Container, Header, Main, Dropdown, DropdownItem, DropdownMenu } from "element-ui";

export function useElementUI(Vue) {
  Vue.prototype.$ELEMENT = { size: "mini", zIndex: 2000 };
  Vue.use(Button);
  Vue.use(Select);
  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Container);
  Vue.use(Header);
  Vue.use(Main);
  Vue.use(Dropdown);
  Vue.use(DropdownItem);
  Vue.use(DropdownMenu);
}
