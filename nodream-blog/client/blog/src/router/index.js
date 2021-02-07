const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const Index = () => import('views/index/Index')
const Posts = () => import('views/posts/Posts')
const Picture = () => import('views/picture/Picture')
const Post = () => import('views/posts/childComps/Post')
const NotFound = () => import('components/common/NotFound')

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    meta: {
      title: 'No-Dream'
    }
  },
  {
    path: '/posts/:page',
    name: 'posts',
    component: Posts,
    meta: {
      title: 'No-Dream | Home'
    }
  },
  {
    path: '/posts',
    redirect: '/posts/1'
  },
  {
    path: '/post',
    redirect: '/posts/1'
  },
  {
    path: '/post',
    redirect: '/posts'
  },
  {
    path: '/picture',
    name: 'Picture',
    component: Picture,
    meta: {
      title: 'No-Dream | Picture'
    }
  },
  {
    path: '/post/:id',
    name: 'post',
    component: Post,
    meta: {
      title: 'No-Dream | Post'
    }
  },
  {
    path: '*',
    name: 'notfound',
    component: NotFound,
    meta: {
      title: 'No-Dream | NotFound'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from ,next) => {
  if (to.meta.title) {
    document.title = to.meta.title
    next()
  }
})

export default router
