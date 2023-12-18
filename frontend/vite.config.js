import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

console.log(process.env.VERCEL_ENV);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VERCEL_ENV === 'production' ? process.env.API_URL : 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
