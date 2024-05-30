import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import DeepLink from '../views/Deeplink.vue'
import Zhan from '../views/Zhan.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Deeplink',
      component: DeepLink
    },
    {
      path: '/Zhan',
      name: 'Zhan',
      component: Zhan,
      forceUpdate: true,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
