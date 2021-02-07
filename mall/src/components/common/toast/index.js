import Toast from './Toast.vue';

const obj = {};

obj.install = function (Vue) {
  const contrustor = Vue.extend(Toast);
  const instance = new contrustor();
  instance.$mount(document.createElement('div'));
  document.body.appendChild(instance.$el);
  Vue.prototype.$toast = instance;
};

export default obj;