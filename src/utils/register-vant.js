import Vue from 'vue'
import {
  NavBar,
  Button,
  Field,
  CellGroup,
  Toast,
  Tabbar,
  TabbarItem,
  PullRefresh,
  List,
  Cell,
  Tab,
  Tabs,
  Grid,
  GridItem,
  Image,
  Loading,
  Lazyload,
  Row,
  Col,
  Tag,
  Icon,
  Popup,
  Search,
  Skeleton
} from 'vant'
Vue
  .use(NavBar)
  .use(Button)
  .use(Field)
  .use(CellGroup)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(PullRefresh)
  .use(List)
  .use(Cell)
  .use(Tab)
  .use(Tabs)
  .use(Grid)
  .use(GridItem)
  .use(Image)
  .use(Loading)
  .use(Lazyload, {
    lazyComponent: true
  })
  .use(Row)
  .use(Col)
  .use(Tag)
  .use(Icon)
  .use(Popup)
  .use(Search)
  .use(Skeleton)
