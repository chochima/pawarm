const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 產品評價 API
app.get('/api/reviews', (req, res) => {
  const reviews = [
    { id: 1, userName: "Tina Liu", rating: 5, date: "2025-12-08", comment: "這款好看又可愛，質感超乎預期！", images: ["https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1772813398169.png", "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1772813435873.png"] },
    { id: 2, userName: "Gary Wu", rating: 5, date: "2025-12-07", comment: "很喜歡！分享給大家。", images: [] },
    { id: 3, userName: "王小明", rating: 4, date: "2025-11-20", comment: "出貨速度很快，包裝也很精緻，唯一的缺點是顏色比照片稍微深一點。", images: [] },
    { id: 4, userName: "陳雅婷", rating: 5, date: "2025-11-18", comment: "送給朋友當生日禮物，她超級開心！", images: ["https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1772813486601.png"] },
    { id: 5, userName: "張志偉", rating: 3, date: "2025-11-15", comment: "東西是不錯，但盒子有點壓到了，希望能加強保護。", images: [] },
    { id: 6, userName: "李淑芬", rating: 5, date: "2025-11-10", comment: "買了兩次了，品質依然穩定，非常推薦。", images: [] },
    { id: 7, userName: "林大同", rating: 4, date: "2025-11-05", comment: "CP值很高，實體比照片看起來更有質感。", images: ["https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1772813525442.png"] },
    { id: 8, userName: "周杰", rating: 2, date: "2025-11-02", comment: "有點失望，收到時有些小刮痕。", images: [] },
    { id: 9, userName: "吳美玲", rating: 5, date: "2025-10-28", comment: "超級滿意！包裝非常用心，還有手寫卡片，很溫馨。", images: [] },
    { id: 10, userName: "鄭小豪", rating: 4, date: "2025-10-25", comment: "質感很好，但希望能有更多顏色可以選。", images: ["https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1772813571846.png"] },
    { id: 11, userName: "黃百合", rating: 5, date: "2025-10-20", comment: "非常精緻的工藝，擺在桌上賞心悅目。", images: [] },
    { id: 12, userName: "劉志明", rating: 4, date: "2025-10-15", comment: "大致上很棒，物流速度也能接受。", images: [] }
  ];

  // 1. 計算總評論數
  const totalReviews = reviews.length;

  // 2. 計算平均分數
  const sumRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
  const averageRating = totalReviews > 0 ? (sumRating / totalReviews).toFixed(1) : 0;

  // 3. 回傳結果
  res.json({
    summary: { 
      averageRating: parseFloat(averageRating), 
      totalReviews: totalReviews 
    },
    reviews: reviews
  });
});

// 啟動伺服器，不印出啟動日誌
app.listen(PORT);