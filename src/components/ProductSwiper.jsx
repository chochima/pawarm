import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination} from 'swiper/modules';


import { useState,useEffect } from "react";
import  axios from 'axios'

import CardSingle from "../components/CardSingle";

const{VITE_PATH,VITE_URL}=import.meta.env;





export default function ProductSwiper() {
    


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
        

        <SwiperSlide><CardSingle /></SwiperSlide>
        <SwiperSlide><CardSingle /></SwiperSlide>
        <SwiperSlide><CardSingle /></SwiperSlide>
        <SwiperSlide><CardSingle /></SwiperSlide>
        <SwiperSlide><CardSingle /></SwiperSlide>
        <SwiperSlide><CardSingle /></SwiperSlide>

    </Swiper>
    </>
);
}