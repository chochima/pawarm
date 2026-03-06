const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// 使用 CORS 中間件，確保 React 前端可以順利抓到資料
app.use(cors());
app.use(express.json());

// 測試用 API
app.get('/api/test', (req, res) => {
  res.json({ status: "success", message: "API 連接成功！" });
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});