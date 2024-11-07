<script setup lang="ts">
import { ref } from 'vue';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonText } from '@ionic/vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const fullName = ref('');

async function handleSubmit() {
  await auth.signup(email.value, password.value, fullName.value);
  if (auth.signupSuccess) {
    setTimeout(() => {
      router.push('/login');
    }, 5000);
  }
}
</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Sign Up</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <div v-if="auth.signupSuccess" class="ion-text-center ion-padding">
        <ion-text color="success">
          <h2>Registration Successful!</h2>
          <p>Please check your email inbox to verify your account. You will be redirected to the login page in a few seconds.</p>
        </ion-text>
      </div>
      <form v-else @submit.prevent="handleSubmit">
        <ion-item>
          <ion-label position="floating">Full Name</ion-label>
          <ion-input
            v-model="fullName"
            type="text"
            required
          ></ion-input>
        </ion-item>
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
            minlength="6"
          ></ion-input>
        </ion-item>
        <div class="ion-padding">
          <ion-button
            expand="block"
            type="submit"
            :disabled="auth.loading"
          >
            {{ auth.loading ? 'Creating Account...' : 'Sign Up' }}
          </ion-button>
        </div>
        <p v-if="auth.error" class="ion-text-center">
          <ion-text color="danger">{{ auth.error }}</ion-text>
        </p>
      </form>
    </ion-card-content>
  </ion-card>
</template>