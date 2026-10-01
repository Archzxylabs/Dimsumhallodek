import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { avatarkitVitePlugin } from '@spatius/avatarkit/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    avatarkitVitePlugin()
  ],
  server: {
    port: 5174,
    host: true,
    allowedHosts: true,
    proxy: {
      '/api/archava': 'http://localhost:5005'
    }
  }
});
