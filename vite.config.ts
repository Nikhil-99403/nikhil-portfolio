import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          framer: ['framer-motion'],
          icons: ['lucide-react']
        }
      }
    }
  }
});
