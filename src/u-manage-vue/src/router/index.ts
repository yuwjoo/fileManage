import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/views/layout/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: { name: 'home' },
      meta: {
        icon: 'close'
      },
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/home/index.vue')
        },
        {
          path: 'abort',
          name: 'abort',
          component: () => import('@/views/abort/index.vue')
        }
      ]
    }
  ]
});

export default router;
