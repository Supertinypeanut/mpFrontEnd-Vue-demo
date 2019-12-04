import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    // 首页
    path: '/',
    name: 'home',
    component: () => import('@/views/home'),
    children: [
      {
        path: '',
        name: 'first',
        component: () => import('@/views/home/content')
      }
    ]
  },
  {
    // 登入
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    // 搜索页
    name: 'search',
    path: '/search',
    component: () => import('@/views/home/search')
  }
]

const router = new VueRouter({
  routes
})

export default router
