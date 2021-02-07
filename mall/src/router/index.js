import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

const Home = () => import ('views/home/Home');
const Category = () => import ('views/category/Category');
const Car = () => import ('views/car/Car');
const Profile = () => import ('views/profile/Profile');
const Detail = () => import ('views/detail/Detail');

const routes = [
  {
    path: '/',
    redirect: '/home',
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/home',
    component: Home,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/car',
    component: Car,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta: {
      keepAlive: false
    }
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
