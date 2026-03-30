import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// 🚩 修改點：使用 command 或 mode 來判斷
export default defineConfig(({ mode }) => {
  return {
    // 如果 repo 名稱叫 pawarm，請確保前後都有斜線
    base: mode === 'production' ? '/pawarm/' : '/',
    plugins: [
      react(),
      svgr({
        exportAsDefault: true, 
      }),
    ],
  }
})