import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Force Vite restart to pick up new react-icons dependency
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
