import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/careerexplorer/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '127.0.0.1',
    cors: false,
    hmr: {
      host: '127.0.0.1'
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'recharts': ['recharts'],
          'react-vendor': ['react', 'react-dom'],
          'ui-components': ['@radix-ui/react-alert-dialog', '@radix-ui/react-slot', '@radix-ui/react-tabs']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})