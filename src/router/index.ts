import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ─── 已登录路由（带 Header） ───
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'reflection',
          name: 'reflection',
          component: () => import('@/views/ReflectionView.vue'),
        },
        {
          path: 'evolution',
          name: 'evolution',
          component: () => import('@/views/EvolutionView.vue'),
        },
        {
          path: 'evolution-summary',
          name: 'evolution-summary',
          component: () => import('@/views/EvolutionSummaryView.vue'),
        },
      ],
    },

    // ─── 未登录路由（无 Header） ───
    {
      path: '/auth',
      component: GuestLayout,
      children: [
        // 未来扩展：登录、注册等页面
        // { path: 'login', name: 'login', component: () => import('@/views/LoginView.vue') },
      ],
    },
  ],
})

export default router
