const userMap = {
  'admin': [1, 2, 5],
  'admin2': [1, 5]
}
const routes = [
  {
    path: 'page1',
    name: 'PAGE1',
    meta: {
      title: '页面1',
      authority: 1
    },
    component: () => import('@/views/page/page1')
  },
  {
    path: 'page2',
    name: 'PAGE2',
    meta: {
      title: '页面2',
      authority: 2
    },
    component: () => import('@/views/page/page2')
  },
  {
    path: 'page3',
    name: 'PAGE3',
    meta: {
      title: '页面3',
      authority: 5
    },
    component: () => import('@/views/page/page3')
  }
]

function saveUserInfo(user, info) {
  localStorage.setItem(user, JSON.stringify(info))
}

function getUserInfo(user) {
  return JSON.parse(localStorage.getItem(user))
}

export {
  userMap,
  routes,
  saveUserInfo,
  getUserInfo
}