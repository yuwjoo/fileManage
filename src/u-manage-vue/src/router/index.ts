import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/layout/layout.vue'),
      redirect: { name: 'warehouse' },
      children: [
        {
          path: 'warehouse',
          name: 'warehouse',
          component: () => import('@/views/warehouse/warehouse.vue')
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
