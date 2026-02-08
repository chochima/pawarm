import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'


// https://vite.dev/config/
export default defineConfig({
  base:process.env.NODE_ENV === 'production' ? '/pawarm/' : '/',
  plugins: [react(),
     svgr({
      exportAsDefault: true, 
    }),
  ],
})


