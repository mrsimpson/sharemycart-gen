import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { supabase } from '@/lib/supabase';
import type { User } from '@/types';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const signupSuccess = ref(false);

  const isAuthenticated = computed(() => !!user.value);

  function setUser(userData: User) {
    user.value = userData;
  }

  function clearUser() {
    user.value = null;
  }

  async function login(email: string, password: string) {
    try {
      loading.value = true;
      error.value = null;
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email!,
          full_name: data.user.user_metadata.full_name,
          avatar_url: data.user.user_metadata.avatar_url,
        });
      }
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  async function signup(email: string, password: string, fullName: string) {
    try {
      loading.value = true;
      error.value = null;
      signupSuccess.value = false;

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (signUpError) throw signUpError;
      
      if (data.user && data.user.identities?.length === 0) {
        error.value = 'This email is already registered. Please login or reset your password.';
        return;
      }

      if (data.user) {
        signupSuccess.value = true;
      }
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    try {
      await supabase.auth.signOut();
      clearUser();
    } catch (e: any) {
      error.value = e.message;
    }
  }

  return {
    user,
    loading,
    error,
    signupSuccess,
    isAuthenticated,
    login,
    logout,
    signup,
    setUser,
    clearUser,
  };
});