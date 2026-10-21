import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Web3Forms access keys are public client keys (domain-restricted in dashboard).
  envPrefix: ['VITE_', 'WEB3FORM_'],
})
