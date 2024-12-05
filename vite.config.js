import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/digitus": {
        target: "https://digitus.alwaysdata.net",
        changeOrigin: true,
        secure: true
      }
    }
  }
})
