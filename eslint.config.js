import js from '@eslint/js'
import react from 'eslint-plugin-react' // 1. 補上這個匯入
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'public']),
  
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'react': react, // 2. 註冊 react 插件
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2020,
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
    // 3. 告訴 ESLint 如何偵測 React 版本
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules, // 4. 載入 React 基礎規則
      ...react.configs['jsx-runtime'].rules, // 5. 支援 React 17+ 免寫 import React 的規則
      ...reactHooks.configs.recommended.rules,
      
      'indent': ['error', 2],
      'no-unused-vars': 'error',
      'react-hooks/set-state-in-effect': 'error',
      'no-irregular-whitespace': 'error',
      'no-undef': 'error',
      'react-refresh/only-export-components': 'warn',

      // 🚩 最關鍵的兩行：強制讓 ESLint 認得 JSX 裡的變數使用
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
  },
])