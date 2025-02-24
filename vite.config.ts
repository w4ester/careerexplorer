import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '127.0.0.1',
  },
  define: {
    'process.env': {
      BLS_API_KEY: JSON.stringify(loadEnv(process.env.NODE_ENV || 'development', process.cwd()).BLS_API_KEY),
    },
  },
});