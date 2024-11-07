import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '@/lib/supabase';
import type { ShoppingItem } from '@/types';

export const useItemsStore = defineStore('items', () => {
  const items = ref<ShoppingItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchItems(listId: string) {
    try {
      loading.value = true;
      const { data, error: fetchError } = await supabase
        .from('shopping_items')
        .select('*')
        .eq('list_id', listId)
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;
      items.value = data || [];
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  async function addItem(listId: string, name: string, quantity: number, category?: string) {
    try {
      const { data, error: createError } = await supabase
        .from('shopping_items')
        .insert([{ list_id: listId, name, quantity, category }])
        .select()
        .single();

      if (createError) throw createError;
      if (data) {
        items.value.push(data);
      }
    } catch (e: any) {
      error.value = e.message;
    }
  }

  async function toggleItem(itemId: string, isCompleted: boolean) {
    try {
      const { error: updateError } = await supabase
        .from('shopping_items')
        .update({ is_completed: isCompleted })
        .eq('id', itemId);

      if (updateError) throw updateError;
      
      const item = items.value.find(i => i.id === itemId);
      if (item) {
        item.is_completed = isCompleted;
      }
    } catch (e: any) {
      error.value = e.message;
    }
  }

  async function deleteItem(itemId: string) {
    try {
      const { error: deleteError } = await supabase
        .from('shopping_items')
        .delete()
        .eq('id', itemId);

      if (deleteError) throw deleteError;
      items.value = items.value.filter(item => item.id !== itemId);
    } catch (e: any) {
      error.value = e.message;
    }
  }

  return {
    items,
    loading,
    error,
    fetchItems,
    addItem,
    toggleItem,
    deleteItem,
  };
});