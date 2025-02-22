import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import terser from '@rollup/plugin-terser'

export default defineConfig({
  plugins: [
    react(),
    terser()
  ],
  base: '/careerexplorer/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})