import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/users": "https://wedding-spark-backend.vercel.app",
      "/venders": "https://wedding-spark-backend.vercel.app",
    },
  },
  plugins: [react()],
})
