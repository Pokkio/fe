import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/cut',
    name: 'Cut',
    component: () => import('@/views/cut/Cut')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/order/Order')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/profile/Profile')
  },
  {
    path: '/',
    redirect: '/cut'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
