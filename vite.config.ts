import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// base './' hace que las rutas a los archivos sean relativas. Asi la misma
// compilacion funciona en GitHub Pages (que sirve desde /nombre-del-repo/),
// en Vercel y abriendo dist/index.html directamente.
export default defineConfig({
  base: './',
  plugins: [react()],
  test: {
    globals: true,
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
});
