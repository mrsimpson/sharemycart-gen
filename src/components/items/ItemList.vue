<script setup lang="ts">
import { computed } from 'vue';
import { IonList, IonItemGroup, IonItemDivider, IonLabel, IonItem, IonCheckbox, IonButton } from '@ionic/vue';
import type { ShoppingItem } from '@/types';
import { useItemsStore } from '@/stores/items';

const props = defineProps<{
  items: ShoppingItem[];
}>();

const itemsStore = useItemsStore();

const sortedItems = computed(() => {
  return [...props.items].sort((a, b) => {
    if (a.is_completed === b.is_completed) {
      return 0;
    }
    return a.is_completed ? 1 : -1;
  });
});

const groupedItems = computed(() => {
  const groups: Record<string, ShoppingItem[]> = {
    'Uncategorized': []
  };
  
  sortedItems.value.forEach(item => {
    const category = item.category || 'Uncategorized';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
  });
  
  return groups;
});
</script>

<template>
  <ion-list>
    <ion-item-group v-for="(items, category) in groupedItems" :key="category">
      <ion-item-divider>
        <ion-label>{{ category }}</ion-label>
      </ion-item-divider>
      
      <ion-item v-for="item in items" :key="item.id">
        <ion-checkbox
          slot="start"
          :checked="item.is_completed"
          @ion-change="itemsStore.toggleItem(item.id, !item.is_completed)"
        ></ion-checkbox>
        <ion-label :class="{ 'ion-text-muted': item.is_completed }">
          {{ item.name }} ({{ item.quantity }})
        </ion-label>
        <ion-button
          slot="end"
          fill="clear"
          color="danger"
          @click="itemsStore.deleteItem(item.id)"
        >
          Delete
        </ion-button>
      </ion-item>
    </ion-item-group>
  </ion-list>
</template>