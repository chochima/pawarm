import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules'; 

import { useState, useEffect } from "react";
import axios from 'axios';

import CardSingle from "../components/CardSingle";

// 🚩 注意：Vite 環境變數需確保正確載入
const { VITE_PATH, VITE_URL } = import.meta.env;

export default function ProductSwiper() {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    // 🚩 1. 將獲取資料的邏輯移到 Effect 內部
    // 這能解決「連鎖渲染」的警告，且不需要將函式放入依賴陣列
    const getSixRandomProducts = async () => {
      try {
        const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`);
        const allData = res.data.products;

        // 隨機打亂並取出前 6 個
        const shuffled = [...allData]
          .sort(() => 0.5 - Math.random()) 
          .slice(0, 6); 

        setRandomProducts(shuffled);
      } catch (err) {
        console.error("抓取隨機資料失敗", err);
      }
    };

    getSixRandomProducts();
  }, []); // 🚩 保持空陣列，確保只在掛載時執行一次

  return (
    <>
      <Swiper
        spaceBetween={24}
        // 🚩 動態決定 loop 邏輯：
        // 當 slidesPerView 為 4 時，資料至少要有 8 筆 (slidesPerView * 2) 才能順暢 loop
        loop={randomProducts.length >= 8} 
        freeMode={true}
        speed={1200}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]} 
        breakpoints={{
          0: { slidesPerView: 1.2 },    // 手機
          768: { slidesPerView: 4 }     // 平板與桌機
        }}
        className="my-swiper pb-5" // 增加 padding 讓分頁點（dots）有空間
      >
        {randomProducts.map((item) => (
          <SwiperSlide key={item.id}>
            {/* 🚩 傳入產品資料給先前修復好的 CardSingle */}
            <CardSingle product={item}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}