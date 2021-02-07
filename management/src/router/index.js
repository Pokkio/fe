import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Home = () => import('views/home/Home');
const Login = () => import('views/login/Login');
const Register = () => import('views/login/Register');
const Zhuanlan =() => import('views/zhuanlan/Zhuanlan');
const Work = () => import('views/work/Work');
const Chat = () => import('views/chat/Chat');
const Moments = () => import('views/moments/Moments');
const Resource = () => import('views/resource/Resource');
const HomeDetail = () => import('views/home/childComps/HomeDetail');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/zhuanlan',
    name: 'Zhuanlan',
    component: Zhuanlan
  },
  {
    path: '/work',
    name: 'Work',
    component: Work
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/moments',
    name: 'Moments',
    component: Moments
  },
  {
    path: '/resource',
    name: 'Resource',
    component: Resource
  },
  {
    path: '/detail/:id',
    name: 'HomeDetail',
    component: HomeDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

function setCookie(c_name, value){
　let exdate= new Date();
　exdate.setDate(exdate.getDate() + '3d');
　document.cookie = c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function getCookie(name) {
  let arr, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if (arr=document.cookie.match(reg))
      return (arr[2]);
  else
      return null;
}

function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval!=null)
      document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    delCookie('Authorization');
    delCookie('User');
  }
  let user = getCookie('Authorization');
  if (!user && to.path != '/login' && to.path != '/register') {
    next({path: '/login'})
  } else {
    next()
  }
})

export default router
