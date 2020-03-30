import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/led',
      name: 'led',
      component: () => import('@/views/LED.vue')
    },
    {
      path: '/robot',
      name: 'robot',
      component: () => import('@/views/Robot.vue')
    },
    {
      path: '/spacekvant',
      name: 'spacekvant',
      component: () => import('@/views/Spacekvant.vue')
    },
    {
      path: '/lab',
      name: 'lab',
      component: () => import('@/views/LR.vue')
    }
  ]
})
