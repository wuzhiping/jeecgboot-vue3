import type { App } from 'vue';
import { Icon } from './Icon';
import { Button } from './Button';
import {
  // Need
  Button as AntButton,
  Input,
  Layout,
  Form,
  FormItem,
  Row,
  Radio,
  Badge,
  Menu,
  MenuItem,
  Dropdown,
  Tag,
  Table,
  RadioGroup,
  Col,
  Select,
  SelectOption,
  DatePicker,
  Tabs,
  TabPane
} from 'ant-design-vue';

const compList = [AntButton.Group,Icon];

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });

  app.use(Input).use(Button).use(Layout).use(Form).use(Tag).use(FormItem).use(Row).use(Col).use(Select).use(SelectOption).use(DatePicker).use(TabPane).use(Tabs).use(Radio).use(RadioGroup).use(Badge).use(Menu).use(MenuItem).use(Dropdown).use(Table);
}
