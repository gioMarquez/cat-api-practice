import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '64e5-189-141-40-21.ngrok-free.app',
      '57ff-187-243-214-247.ngrok-free.app',
      'd2c5-189-141-40-21.ngrok-free.app'
    ]
  }
})
