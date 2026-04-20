import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './core'),
      '@services': path.resolve(__dirname, './services'),
      '@design-system': path.resolve(__dirname, './design-system'),
      '@lab': path.resolve(__dirname, './src/lab'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: true,
  },
  test: {
    include: [
      'core/**/*.test.ts',
      'core/lab/**/*.test.ts',
      'src/**/*.test.{ts,tsx}',
      'src/lab/**/*.test.{ts,tsx}',
    ],
  },
});
