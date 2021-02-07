import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { 
  Button,
  Swipe,
  SwipeItem,
  Field,
  TreeSelect,
  Overlay,
  Notify,
  Icon,
  TabbarItem,
  Tabbar,
  Tabs,
  Tab
 } from 'vant'

Vue.use(Button)
    .use(Swipe)
    .use(SwipeItem)
    .use(Field)
    .use(TreeSelect)
    .use(Overlay)
    .use(Notify)
    .use(Icon)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Tabs)
    .use(Tab)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
