import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname)
  return {
    plugins: [react()],
    base: '/todo-app-react/',
    server: {
      port: env.VITE_PORT,
    },
  }
})

