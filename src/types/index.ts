export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export interface ShoppingList {
  id: string;
  title: string;
  description?: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface ShoppingItem {
  id: string;
  list_id: string;
  name: string;
  quantity: number;
  category?: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface ListShare {
  id: string;
  list_id: string;
  user_id: string;
  role: 'viewer' | 'editor';
  created_at: string;
}