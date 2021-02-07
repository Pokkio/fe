import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 插件
import toast from 'components/common/toast';

// 第三方库
import FastClick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';

Vue.config.productionTip = false;

// 事件总线对象
Vue.prototype.$bus = new Vue();

// 使用套层插件
Vue.use(toast);

// 解决移动端300ms延迟
FastClick.attach(document.body);

// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
});

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
