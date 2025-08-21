import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
     tailwindcss(),
    react(),

  ], 

   
theme: {
  extend: {
    colors: {
      gold: "#d4af37",
    },
    boxShadow: {
      goldGlow: "0 0 15px rgba(212, 175, 55, 0.6)",
    },
  },
},


})
