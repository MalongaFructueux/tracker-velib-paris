import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests to Vélib' API to bypass CORS
      '/api/velib': {
        target: 'https://velib-metropole-opendata.smovengo.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/velib/, '/opendata/Velib_Metropole'),
        secure: true,
      },
    },
  },
})
