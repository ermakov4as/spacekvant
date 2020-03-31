import Vue from 'vue'
import Router from 'vue-router'
import Spacekvant from '@/views/Spacekvant.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'spacekvant',
      component: Spacekvant
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
