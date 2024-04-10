import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: '/setting',
          name: 'Setting',
          component: () => import('../views/Setting.vue')
        }
      ]
    }
  ]
})

export default router
