import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  define: {
    // Baked at build time. Used by the lab library header as a
    // fallback 'Last updated' stamp until guides grow a frontmatter
    // `updated:` field of their own.
    'import.meta.env.VITE_BUILD_DATE': JSON.stringify(
      new Date().toISOString().split('T')[0],
    ),
  },
  plugins: [
    react(),
    tailwindcss(),
    {
      // Dev mirror of the production host rewrite: labs.justinh.design
      // serves labs.html. Visit http://labs.localhost:5173/ and the lab
      // owns "/" directly — no index.html bounce, no replaceState swap,
      // so full reloads land back on the lab instead of the portfolio.
      name: 'lab-subdomain-rewrite',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const host = req.headers.host ?? '';
          const url = req.url ?? '/';
          const isInternal =
            url.includes('.') || url.startsWith('/@') || url.startsWith('/node_modules');
          if (host.startsWith('labs.') && !isInternal) {
            req.url = '/labs.html';
          }
          next();
        });
      },
    },
  ],
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
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        labs: path.resolve(__dirname, 'labs.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
    watch: {
      // Live-iteration session journals; watching them causes a full
      // page reload on every checkpoint the browser saves.
      ignored: ['**/.impeccable/**'],
    },
  },
  test: {
    include: [
      'core/**/*.test.ts',
      'core/lab/**/*.test.ts',
      'src/**/*.test.{ts,tsx}',
      'src/lab/**/*.test.{ts,tsx}',
    ],
    setupFiles: ['./src/test-setup.ts'],
  },
});
