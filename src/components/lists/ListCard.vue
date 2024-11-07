<script setup lang="ts">
import { defineProps } from 'vue';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';
import type { ShoppingList } from '@/types';

const props = defineProps<{
  list: ShoppingList;
}>();

const router = useRouter();

function viewList() {
  router.push(`/lists/${props.list.id}`);
}
</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ list.title }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p v-if="list.description">{{ list.description }}</p>
      <div class="ion-padding-top ion-justify-content-between ion-align-items-center">
        <span>Created: {{ new Date(list.created_at).toLocaleDateString() }}</span>
        <ion-button fill="clear" @click="viewList">View List</ion-button>
      </div>
    </ion-card-content>
  </ion-card>
</template>