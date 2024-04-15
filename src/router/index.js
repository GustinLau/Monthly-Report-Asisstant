import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'
import SubView from '@/components/SubView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('../views/Home/Home.vue')
        },
        {
          path: '/setting',
          name: 'Setting',
          component: SubView,
          children: [
            {
              path: 'system',
              name: 'System',
              component: () => import('../views/Setting/System/System.vue')
            },
            {
              path: 'about',
              name: 'About',
              component: () => import('../views/Setting/About.vue')
            },
            {
              path: 'manual',
              name: 'Manual',
              component: () => import('../views/Setting/Manual.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
