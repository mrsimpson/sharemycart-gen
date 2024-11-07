<script setup lang="ts">
import { ref } from 'vue';
import { IonCard, IonCardContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { useItemsStore } from '@/stores/items';

const props = defineProps<{
  listId: string;
}>();

const itemsStore = useItemsStore();
const name = ref('');
const quantity = ref(1);
const category = ref('');

async function handleSubmit() {
  if (!name.value.trim()) return;
  
  await itemsStore.addItem(
    props.listId,
    name.value,
    quantity.value,
    category.value || undefined
  );
  
  name.value = '';
  quantity.value = 1;
  category.value = '';
}
</script>

<template>
  <ion-card>
    <ion-card-content>
      <form @submit.prevent="handleSubmit">
        <ion-item>
          <ion-label position="floating">Item Name</ion-label>
          <ion-input
            v-model="name"
            type="text"
            required
            placeholder="Enter item name"
          ></ion-input>
        </ion-item>
        
        <ion-item>
          <ion-label position="floating">Quantity</ion-label>
          <ion-input
            v-model="quantity"
            type="number"
            min="1"
            required
          ></ion-input>
        </ion-item>
        
        <ion-item>
          <ion-label position="floating">Category (Optional)</ion-label>
          <ion-input
            v-model="category"
            type="text"
            placeholder="Enter category"
          ></ion-input>
        </ion-item>
        
        <div class="ion-padding-top">
          <ion-button expand="block" type="submit">
            Add Item
          </ion-button>
        </div>
      </form>
    </ion-card-content>
  </ion-card>
</template>