import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 首页
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home'),
    children: [
      {
        path: '',
        name: 'first',
        component: () => import('@/views/home/first')
      }
    ]
  },
  // 登入
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
