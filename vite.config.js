import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // ⚠️ Ini yang penting untuk mengatasi error 404 saat akses langsung ke /login
    historyApiFallback: true,
  }
})
