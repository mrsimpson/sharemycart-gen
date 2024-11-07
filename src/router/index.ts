import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  console.log('Route:', to);

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && auth.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
