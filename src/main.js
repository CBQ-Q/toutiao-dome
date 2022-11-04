import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './css/index.css'
import 'amfe-flexible'
import {
  Button, NavBar, Form, Field,
  Toast, CountDown, Tabbar,
  TabbarItem, Icon, Image as VanImage, Grid, GridItem, Cell, CellGroup, Dialog
} from 'vant'
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Toast)
Vue.use(CountDown)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(VanImage)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
