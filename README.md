**icon連結**
https://freesvgicons.com/

**Commit規範**
https://www.cjkuo.net/git_log_commit_tag/


**圖片整理**
1.以功能區分建資料夾(ex.商品圖/動物示意圖/里程碑用圖/LOGO...)
2.商品圖片 = 動物名稱+流水編號

**scss**
1.components 依照設計稿規畫分檔案(ex. btn_filled / btn_outline)
2.BS5樣式調整 all.scss裡面有關鍵字(有任何調整務必要在 variables & all 同步備註)


Pawarm 是一個專注於寵物與動物保育的綜合型 Web 應用程式。專案結合了寵物用品商城、會員系統、動物保育資訊（如石虎保育追蹤），以及完整的後台管理系統，致力於打造一個關注動物福利與服務寵物飼主的優質平台。

## ✨ 核心功能 (Features)

* 🛍️ **寵物商城系統**: 提供商品瀏覽、購物車管理、結帳流程，以及優惠券折扣功能。
* 🐾 **動物保育與追蹤**: 收錄石虎保育資訊、動物協會動態 (Animal Association) 與動物新聞，提升大眾對生態保護的意識。
* 👤 **會員中心**: 包含使用者登入機制、會員專屬里程碑 (Milestone) 紀錄、歷史訂單與活動查詢。
* ⚙️ **後台管理系統 (Backstage)**: 專屬管理員的儀表板，支援商品管理、訂單狀態追蹤、優惠券設定以及訂單數據圖表分析 (Order Analysis)。

## 🛠️ 技術棧 (Tech Stack)

* **前端框架**: React, Vite
* **路由管理**: React Router v6
* **狀態管理**: Redux Toolkit (包含 `authSlice`, `cartSlice`)
* **樣式工具**: SCSS / Sass (模組化設計與變數管理)
* **後端架構**: Node.js (位於 `server/` 目錄)

## 📂 專案目錄結構 (Folder Structure)

```text
pawarm/
├── public/             # 靜態資源 (SVG, Logo 等)
├── server/             # 後端 Node.js 伺服器代碼
├── src/                # 前端原始碼
│   ├── assets/         # 字體 (Fonts) 與圖片資源
│   ├── components/     # 共用 UI 元件 (如 Header, Footer, Swiper, Modal, Stepper)
│   ├── data/           # 本地端模擬資料 (JSON)
│   ├── hook/           # 自定義 Hooks (useAuth, useCart)
│   ├── image/          # 專案圖庫 (背景圖、圖示、追蹤地圖等)
│   ├── pages/          # 頁面組件 (首頁、商城、會員中心、結帳、後台管理等)
│   ├── router/         # React Router 路由設定檔
│   ├── services/       # API 服務或靜態服務資料
│   ├── slice/          # Redux Toolkit Slices (狀態切片)
│   ├── store/          # Redux Store 設定檔
│   ├── style/          # SCSS 樣式檔 (全域變數、元件樣式)
│   └── utils/          # 共用工具函式 (Filter, Request 等)
├── .env.example        # 環境變數範例檔
├── eslint.config.js    # ESLint 設定檔
├── package.json        # 前端專案相依套件與腳本
└── vite.config.js      # Vite 構建設定檔