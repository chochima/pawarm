import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules'; // 🚩 僅保留分頁模組

import { useState, useEffect } from "react";
import axios from 'axios';

import CardSingle from "../components/CardSingle";

const { VITE_PATH, VITE_URL } = import.meta.env;

export default function ProductSwiper() {
  const [randomProducts, setRandomProducts] = useState([]);

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

  useEffect(() => {
    getSixRandomProducts();
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={24}
        // 🚩 修正：根據資料長度動態決定 loop，解決 404 警告
        // 你的 breakpoints 桌機顯示 4 個，資料僅 6 筆，所以這裡設為 false 或是 length >= 8
        loop={randomProducts.length >= 8} 
        freeMode={true}
        speed={1200}
        pagination={{
          clickable: true,
        }}
        // 🚩 移除 navigation 相關設定
        modules={[Pagination]} 
        breakpoints={{
          0: { slidesPerView: 1.2 },    // 手機
          768: { slidesPerView: 4 }     // 平板以上
        }}
        className="my-swiper"
      >
        {randomProducts.map((item) => (
          // 🚩 補上 React 必要的 key 屬性
          <SwiperSlide key={item.id}>
            <CardSingle product={item}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}