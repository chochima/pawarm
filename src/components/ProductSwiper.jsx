import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination} from 'swiper/modules';


import { useState,useEffect } from "react";
import  axios from 'axios'

import CardSingle from "../components/CardSingle";

const{VITE_PATH,VITE_URL}=import.meta.env;





export default function ProductSwiper() {
    
    const [randomProducts, setRandomProducts] = useState([]);


  const getSixRandomProducts = async () => {
  try {
    const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`);
    const allData = res.data.products;

    // 隨機打亂並取出前 6 個
    const shuffled = [...allData]
      .sort(() => 0.5 - Math.random()) // 利用 0.5 產生正負機率來打亂
      .slice(0, 6); // 切取前 6 筆

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
        //slidesPerView={4}
        spaceBetween={24}
        loop={true}
        freeMode={true}
        speed={1200}
        pagination={{
            clickable: true,
        }}
        navigation={true}
        modules={[Pagination]}
        breakpoints={{
            0: { slidesPerView: 1.2 },    // 手機
            768: { slidesPerView: 4 }  // 平板以上
        }}

        className="my-swiper">

        {randomProducts.map((item,index) => (
            <SwiperSlide><CardSingle product={item}/></SwiperSlide>
        ))}

    </Swiper>
    </>
);
}