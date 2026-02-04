import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // ✅ 1. ADD THIS LINE: Set the base path for GitHub Pages
  // Replace 'YOUR_REPO_NAME' with your actual repository name (e.g., '/portfolio/')
  // If you are deploying to a custom domain (e.g., bhavuk.com), leave this as '/'
  base: '/portfolio/',

  // ✅ 2. Tell esbuild to handle JSX in .js files during build/serve
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: []
  },

  plugins: [
    react({
      babel: {
        presets: ['@babel/preset-react'],
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
        ],
      },
      include: /\.(mdx|js|jsx|ts|tsx)$/, 
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
    // ✅ 3. Tell esbuild to handle JSX in .js files during dependency optimization
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});