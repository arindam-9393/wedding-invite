import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves the site from https://arindam-9393.github.io/wedding-invite/
  base: '/wedding-invite/',
  plugins: [react()],
})
