import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
  // 1. 全域忽略目錄
  globalIgnores(['dist', 'node_modules', 'public', 'build']),

  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      // 自動偵測 React 版本，避免手動輸入的麻煩
      react: { version: 'detect' },
    },
    rules: {
      // --- 基礎建議規則 ---
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules, // React 17+ 必備：免去 import React

      // --- React Hooks 核心規則 ---
      'react-hooks/rules-of-hooks': 'error',     // 檢查 Hooks 呼叫順序
      'react-hooks/exhaustive-deps': 'warn',    // 檢查 useEffect 相依陣列（非常重要！）

      // --- React Refresh (Vite 開發必備) ---
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // --- 自定義程式碼風格與品質 ---
      
      // 1. 未使用變數：報錯，但允許以底線開頭的變數（例如 _index）
      'no-unused-vars': ['error', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
        'ignoreRestSiblings': true 
      }],

      // 2. 排版：強制使用 2 個空格縮排
      'indent': ['error', 2, { 'SwitchCase': 1 }],

      // 3. 避免低級錯誤：如不規則空白或未定義變數
      'no-irregular-whitespace': 'error',
      'no-undef': 'error',

      // 4. React 相關優化
      'react/prop-types': 'off',               // 如果你沒用 PropTypes 或正要轉 TS 可以關掉
      'react/jsx-no-target-blank': 'error',    // 防止 target="_blank" 的安全漏洞
      
      // 提醒：原本你寫的 react-hooks/set-state-in-effect 
      // 並非官方標準規則名，建議統一交給 exhaustive-deps 處理。
    },
  },
])