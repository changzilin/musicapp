import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store/index.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: true, // 是否缓存组件
    }
  },
  {
    // 配置路由传参
    path: '/ListView/',
    name: 'ListView',
    // 路由规则中开启 props 传参
    props:true,
    component: () => import('../views/ListView.vue')
  },
  // 搜索
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue')
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    // 个人中心
    path: '/me',
    beforeEnter: (to, from, next) => {
      if(store.state.user.isLogin){
        next()
      }else{
        next('/login')
      }
    },
    name: 'me',
    component: () => import(/* webpackChunkName: "about" */ '../views/Me.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
