import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ReflectionView from '@/views/ReflectionView.vue'
import EvolutionView from '@/views/EvolutionView.vue'
import EvolutionSummaryView from '@/views/EvolutionSummaryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/reflection',
      name: 'reflection',
      component: ReflectionView,
    },
    {
      path: '/evolution',
      name: 'evolution',
      component: EvolutionView,
    },
    {
      path: '/evolution-summary',
      name: 'evolution-summary',
      component: EvolutionSummaryView,
    },
  ],
})

export default router
