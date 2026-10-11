import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The Express API (npm run dev:server) serves /api and uploaded media.
// changeOrigin stays false so the API's same-origin check sees the browser's real host.
const api = { target: 'http://localhost:4000', changeOrigin: false }

export default defineConfig({
  plugins: [react()],
  // Pre-bundle deps used by every page (incl. lazy admin pages) at startup, so the dev server
  // does not re-optimize mid-session and break already-loaded pages.
  optimizeDeps: { entries: ['index.html', 'src/**/*.{js,jsx}'] },
  server: {
    proxy: { '/api': api, '/uploads': api },
  },
})
