<script setup lang="ts">
import { onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons } from '@ionic/vue';
import { useListsStore } from '@/stores/lists';
import { useAuthStore } from '@/stores/auth';
import ListCard from '@/components/lists/ListCard.vue';

const listsStore = useListsStore();
const authStore = useAuthStore();

onMounted(() => {
  listsStore.fetchLists();
});

async function handleLogout() {
  await authStore.logout();
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>My Shopping Lists</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="handleLogout">Logout</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div v-if="listsStore.loading" class="ion-text-center ion-padding">
        Loading...
      </div>
      <div
        v-else-if="listsStore.lists.length === 0"
        class="ion-text-center ion-padding"
      >
        No shopping lists yet. Create your first one!
      </div>
      <div v-else>
        <ListCard
          v-for="list in listsStore.lists"
          :key="list.id"
          :list="list"
        />
      </div>
    </ion-content>
  </ion-page>
</template>