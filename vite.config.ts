import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html')
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  plugins: [
    react(),
    TanStackRouterVite(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\/api\/.*\/*.json/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
