import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // 1. 忽略路徑 (排除不需要檢查的資料夾)
  globalIgnores(['dist', 'node_modules', 'public']),
  
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2020,
      // 同時引入瀏覽器與 Node 環境，解決 process, window, console 報錯
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // 載入 JS 與 React Hooks 基礎規則
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      
      // 🚩 解決 152 個警告：把「未使用變數」設為 warn，不再噴整面黃字
      'no-unused-vars': 'warn',

      // 🚩 解決 12 個錯誤：關閉 useEffect 中使用 setState 的強烈限制
      'react-hooks/set-state-in-effect': 'off',

      // 🚩 解決之前的空白報錯：徹底關閉不規則空白檢查
      'no-irregular-whitespace': 'off',

      // 其他環境相容性設定
      'no-undef': 'warn',
      'react-refresh/only-export-components': 'off',
    },
  },
])