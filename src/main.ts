import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { IonicVue } from '@ionic/vue';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import App from './App.vue';
import routes from './router/routes';
import { useAuthStore } from './stores/auth';

/* Core CSS required for Ionic components */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Initialize Pinia store before router guard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && auth.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

app.use(IonicVue);
app.use(router);

router.isReady().then(() => {
  app.mount('#app');
});