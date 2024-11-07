<script setup lang="ts">
import { onMounted } from 'vue';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useAuthStore } from './stores/auth';
import { supabase } from './lib/supabase';

const auth = useAuthStore();

onMounted(() => {
  // Set up auth state listener
  supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      auth.setUser({
        id: session.user.id,
        email: session.user.email!,
        full_name: session.user.user_metadata.full_name,
        avatar_url: session.user.user_metadata.avatar_url,
      });
    } else {
      auth.clearUser();
    }
  });

  // Check current session
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      auth.setUser({
        id: session.user.id,
        email: session.user.email!,
        full_name: session.user.user_metadata.full_name,
        avatar_url: session.user.user_metadata.avatar_url,
      });
    }
  });
});
</script>

<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<style>
/* Global styles */
:root {
  --ion-color-primary: #3880ff;
  --ion-color-secondary: #3dc2ff;
  --ion-color-tertiary: #5260ff;
}
</style>