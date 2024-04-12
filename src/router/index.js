import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index.vue'
import SubView from '@/components/SubView/index.vue'

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
          component: SubView,
          children: [
            {
              path: 'system',
              name: 'System',
              component: () => import('../views/Setting/System/index.vue')
            },
            {
              path: 'about',
              name: 'About',
              component: () => import('../views/Setting/About.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
