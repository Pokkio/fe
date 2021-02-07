import App from './App.vue'
import router from './router'
import { mutations } from './store'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$mutations = mutations

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
