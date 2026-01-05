import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/notes': 'http://localhost:3000',
      '/upload': 'http://localhost:3000',
      '/attachments': 'http://localhost:3000',
    }
  }
})
