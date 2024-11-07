import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });  // Try loading .env.local first
dotenv.config();  // Fall back to .env if variables aren't found

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  // Make env variables available
  define: {
    'process.env': process.env
  },
  // Enhanced environment variable handling
  envPrefix: 'VITE_',
  envDir: process.cwd()
});