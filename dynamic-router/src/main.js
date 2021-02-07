import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(Element, { size: 'medium', zIndex: 2000 })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
