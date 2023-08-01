import {
  Row,
  Col,
  Container,
  Header,
  Main,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Input,
  Backtop,
  Dialog,
  Form,
  FormItem,
  Select,
  Button,
  Upload,
  Message,
  Checkbox,
  CheckboxGroup,
} from "element-ui";

export function useElementUI(Vue) {
  Vue.prototype.$ELEMENT = { size: "mini", zIndex: 2000 };

  Vue.prototype.$message = Message;

  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Container);
  Vue.use(Header);
  Vue.use(Main);
  Vue.use(Dropdown);
  Vue.use(DropdownItem);
  Vue.use(DropdownMenu);
  Vue.use(Input);
  Vue.use(Backtop);
  Vue.use(Dialog);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Select);
  Vue.use(Button);
  Vue.use(Upload);
  Vue.use(Checkbox);
  Vue.use(CheckboxGroup);
}
