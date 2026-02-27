# Lai See Calculator API / App

這是一個以 React + Vite 建置的專案，提供快速且輕量的開發體驗與生產環境部署。

## ✅ 已完成功能 (Project Setup)
1. **環境建置**: 使用 Vite + React 建置，並包含 TailwindCSS 等現代前端工具。
2. **自動部署**: 已設定 GitHub Actions (`.github/workflows/deploy.yml`)，當推播至 `main` 或是 `master` 分支時，將自動部署到 GitHub Pages。
3. **安全與乾淨庫**: 已設定 `.gitignore` 以避免上傳 `node_modules`、暫存檔與環境隱私檔 (`.env`)。

## 🚀 本地端運行 (Run Locally)

**環境要求 (Prerequisites):** 
- Node.js (建議 v20 以上版本)

1. **安裝套件 (Install Dependencies):**
   ```bash
   npm install
   ```

2. **設定環境變數 (Environment Variables):**
   將 `.env.example` 複製為 `.env.local` 或是 `.env`，並填入你的 `GEMINI_API_KEY` 等需要的環境變數：
   ```bash
   cp .env.example .env
   ```

3. **啟動開發伺服器 (Start Dev Server):**
   ```bash
   npm run dev
   ```
   伺服器啟動後，開啟瀏覽器即可預覽。

4. **編譯生產版本 (Build for Production):**
   ```bash
   npm run build
   ```

## 🌐 部署上線 (Deploy)

本專案支援全自動 GitHub Pages 部署。
只要將代碼推播 (Push) 到 GitHub Repository 的 `main` 或是 `master` 分支，GitHub Actions 將會自動執行打包與發布流程。

*注意：如果你的專案部署在 GitHub Pages 的子路徑下（例如 `https://<username>.github.io/<repo>/`），請確保 `vite.config.ts` 中的 `base` 屬性有正確對應你的 `<repo>` 名稱。*
