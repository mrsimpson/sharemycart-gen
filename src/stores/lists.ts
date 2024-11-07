import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '@/lib/supabase';
import type { ShoppingList } from '@/types';

export const useListsStore = defineStore('lists', () => {
  const lists = ref<ShoppingList[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchLists() {
    try {
      loading.value = true;
      const { data, error: fetchError } = await supabase
        .from('shopping_lists')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      lists.value = data;
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  async function createList(title: string, description?: string) {
    try {
      const { data, error: createError } = await supabase
        .from('shopping_lists')
        .insert([{ title, description }])
        .select()
        .single();

      if (createError) throw createError;
      if (data) {
        lists.value.unshift(data);
      }
    } catch (e: any) {
      error.value = e.message;
    }
  }

  return {
    lists,
    loading,
    error,
    fetchLists,
    createList,
  };
});