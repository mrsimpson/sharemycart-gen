import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    component: () => import('@/views/Signup.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/lists/:id',
    component: () => import('@/views/ListDetail.vue'),
    meta: { requiresAuth: true }
  }
];

export default routes;