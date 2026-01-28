import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: ['@babel/preset-react'],
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
        ],
      },
      include: ['**/*.js', '**/*.jsx'], // ✅ Enable JSX in .js files
    }),
  ],
  root: '.',
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@utils': path.resolve(__dirname, '../../packages/utils/src'),
      '@assets': path.resolve(__dirname, '../../packages/ui/assets'),
    },
  },
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: ['date-fns-tz'],
  },
});
