import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/layout/index.vue'),
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
