import Vue from 'vue'
import Router from 'vue-router'
import AeroSpace from '@/views/AeroSpace.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'aerospace',
      component: AeroSpace
    },
    {
      path: '/algoritm',
      name: 'algoritm',
      component: () => import('@/views/Algoritm.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue')
    }
  ]
})
