interface AppConfig {
  supabaseUrl: string;
  supabaseKey: string;
  appName: string;
  apiVersion: string;
}

export const config: AppConfig = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  appName: import.meta.env.VITE_APP_NAME,
  apiVersion: import.meta.env.VITE_API_VERSION
};

// Validate required environment variables
const requiredEnvVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}