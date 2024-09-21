/// <reference types="vitest" />

import {configDefaults} from 'vitest/config'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api.bestmode': {
        target: 'https://api.bettermode.com',
        rewrite: (path) => path.replace(/^\/api.bestmode/, ''),
        changeOrigin: true,
        secure: true,
      },
    },
  },
  test: {
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
  }
})
