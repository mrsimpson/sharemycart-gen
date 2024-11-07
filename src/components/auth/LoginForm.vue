<script setup lang="ts">
import { ref } from 'vue';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');

async function handleSubmit() {
  await auth.login(email.value, password.value);
}

function goToSignup() {
  router.push('/signup');
}
</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Login</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <form @submit.prevent="handleSubmit">
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input
            v-model="email"
            type="email"
            required
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input
            v-model="password"
            type="password"
            required
          ></ion-input>
        </ion-item>
        <div class="ion-padding">
          <ion-button
            expand="block"
            type="submit"
            :disabled="auth.loading"
          >
            {{ auth.loading ? 'Loading...' : 'Login' }}
          </ion-button>
          <ion-button
            expand="block"
            fill="clear"
            @click="goToSignup"
          >
            Don't have an account? Sign up
          </ion-button>
        </div>
        <p v-if="auth.error" class="ion-text-center ion-color-danger">{{ auth.error }}</p>
      </form>
    </ion-card-content>
  </ion-card>
</template>