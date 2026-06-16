import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const srcDir = resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Reproduit le "baseUrl": "./src" du tsconfig de CRA
      // Tous les imports bare (ex: "types", "providers", "features/...") sont résolus depuis src/
      src: srcDir,
      types: resolve(srcDir, 'types'),
      providers: resolve(srcDir, 'providers'),
      features: resolve(srcDir, 'features'),
      functions: resolve(srcDir, 'functions'),
      components: resolve(srcDir, 'components'),
      constant: resolve(srcDir, 'constant'),
      assets: resolve(srcDir, 'assets'),
      helper: resolve(srcDir, 'helper'),
      workers: resolve(srcDir, 'workers'),
      hooks: resolve(srcDir, 'hooks'),
      store: resolve(srcDir, 'store'),
    },
  },
  build: {
    outDir: 'PDZSTA_maptmp',
    emptyOutDir: true,
  },
  // La "homepage" de CRA devient "base" dans Vite
  base: '/PDZSTA_maptmp/',
});
