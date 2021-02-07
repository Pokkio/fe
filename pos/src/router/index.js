import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const Pos = () => import('views/page/Pos');

const routes = [
  {
    path: '/',
    redirect: '/pos',
  },
  {
    path: '/pos',
    component: Pos
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
