import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
});
