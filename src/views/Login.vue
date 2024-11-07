<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import LoginForm from '@/components/auth/LoginForm.vue';
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="ion-text-center">
        <h2>Welcome to Shopping List</h2>
        <p>Please login to continue</p>
      </div>
      <LoginForm />
    </ion-content>
  </ion-page>
</template>