import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { VitePWA } from 'vite-plugin-pwa'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [
    react(),
    VitePWA({
      srcDir: 'public',
      filename: 'service-worker.ts',
      strategies: 'injectManifest',
      injectRegister: false,
      manifest: {
        name: '404Team Game',
        short_name: '404Game',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#222',
        // icons: [ ],
      },
    }),
  ],
})
