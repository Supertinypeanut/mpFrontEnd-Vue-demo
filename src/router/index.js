import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  // 首页
  name: 'Home',
  path: '/',
  component: () => import('@/views/home'),
  children: [{
    name: 'First',
    path: '',
    component: () => import('@/views/home/content')
  }]
},
{
  // 登入
  name: 'Login',
  path: '/login',
  component: () => import('@/views/login')
},
{
  // 搜索页
  name: 'Search',
  path: '/search',
  component: () => import('@/views/home/search')
},
{
  // 搜索结果页
  name: 'Results',
  path: '/search/:q',
  component: () => import('@/views/home/search/results')
},
{
  name: 'Article',
  path: `/article/:article_ID`,
  component: () => import('@/views/home/article')
}
]

const router = new VueRouter({
  routes
})

export default router
