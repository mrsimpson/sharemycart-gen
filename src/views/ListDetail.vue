<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons } from '@ionic/vue';
import { useListsStore } from '@/stores/lists';
import { useItemsStore } from '@/stores/items';
import { supabase } from '@/lib/supabase';
import NewItemForm from '@/components/items/NewItemForm.vue';
import ItemList from '@/components/items/ItemList.vue';

const route = useRoute();
const listId = route.params.id as string;
const listsStore = useListsStore();
const itemsStore = useItemsStore();

const currentList = ref(listsStore.lists.find(list => list.id === listId));

onMounted(async () => {
  if (!currentList.value) {
    const { data } = await supabase
      .from('shopping_lists')
      .select('*')
      .eq('id', listId)
      .single();
    
    if (data) {
      currentList.value = data;
    }
  }
  
  await itemsStore.fetchItems(listId);
});
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ currentList?.title }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <p v-if="currentList?.description" class="ion-padding-bottom">
        {{ currentList.description }}
      </p>

      <NewItemForm :list-id="listId" />

      <div v-if="itemsStore.loading" class="ion-text-center ion-padding">
        Loading items...
      </div>
      <div
        v-else-if="itemsStore.items.length === 0"
        class="ion-text-center ion-padding"
      >
        No items in this list yet. Add your first item above!
      </div>
      <ItemList
        v-else
        :items="itemsStore.items"
      />
    </ion-content>
  </ion-page>
</template>