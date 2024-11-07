<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/vue';
import SignupForm from '@/components/auth/SignupForm.vue';
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/login"></ion-back-button>
        </ion-buttons>
        <ion-title>Sign Up</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="ion-text-center">
        <h2>Create Your Account</h2>
        <p>Join us to start managing your shopping lists</p>
      </div>
      <SignupForm />
    </ion-content>
  </ion-page>
</template>