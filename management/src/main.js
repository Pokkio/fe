import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vueCookies from 'vue-cookies';
import { authorization } from 'network/authorization';

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(vueCookies)
Vue.prototype.$authorization = authorization;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
