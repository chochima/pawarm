import React from "react";
import ImgUpload from "../components/ImgUpload";
import ImgLibrary from "../components/ImgLibrary";
import Activity from "../components/activity";
import LogoSwiper from "../components/LogoSwiper";
import CardSingle from "../components/CardSingle";
import ProductSwiper from "../components/ProductSwiper";




const { useState } = React;
export default function Home() {

  return (<>
  {
    
  //HERO CTA
  <section className="hero-bg-img">
    <div className="container">
    <div className="row px-0 pb-5">

      <div className="col-6">
        <h2 className="mb-0 px-0 title-text">
        以​最​簡單​的​行動​<br/>
        為​動物​帶來​真實​的​改變​</h2>

        <p className="fs-20 pt-32 px-0 mb-48">你​的​每​一​次​購買，​都​是​對​動物​保育​的​貢獻​。​<br/>
        透過​真實​動物​追蹤，​見證​生命​的​軌跡。​</p>

        <button type="button" className="btn btn-outline-primary-500 btn-text btn-outline px-44 py-16">選擇我的動物</button>
    </div>
    
    </div>
    </div>
  </section>

  }

  {
    //推薦商品
    <section className="bgImg-postion">
      <img className="bgImg-absolute" src="./src/image/bg-product.png" alt="product-BG"/>

      <div className="container">
        <h2 className="mb-32 px-0 title-text">推薦商品</h2>

        <ProductSwiper />
      </div>
    </section>
    
  }


  {
    //里程碑CTA
  <section className="milestone-section-bg">
    <div className="container">

    <div className="row d-flex justify-content-between">

      <div className="col-6 px-0">
        <img src="https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1770228794274.png" alt="首頁里程碑"/>
      </div>

      <div className="col-5 px-0">
        <h2 className="mb-0 title-text">讓​保育，<br/>
        成為​每​個​人​都​能​開始​的​小行​動</h2>

        <p className="fs-20 pt-32 mb-48">透過​真實​動物​追蹤，​不​只​能​看到​牠們​的​名字、​故事​和​生活​軌跡，​也​能​親眼​看見​自己​的​支持​如何​帶來​改變。​</p>

        <button type="button" className="btn btn-outline-primary-500 btn-text btn-outline px-44 py-16">我們的里程碑</button>
      </div>

    </div>

    <div className="row pt-32">
      <LogoSwiper />
    </div>

    </div>
  </section>
  
  }
  


  {
    //追蹤動物CTA
  <section className="track-bg-img">
    <div className="container">
    <div className="row px-0">

      <div className="col-6">
        <h2 className="mb-0 px-0 title-text">解鎖​動物​的​遷徙​路​徑​</h2>

        <p className="fs-20 pt-32 px-0 mb-48">​
        ​體驗​激動​人心​的​揭密、​精彩​的​旅程​，​<br/>
        ​​為​全球​保育​工作​做出​貢​獻​。​</p>

        <button type="button" className="btn btn-outline-primary-500 btn-text btn-outline px-44 py-16">追蹤我的動物</button>
      </div>
    
    </div>
    </div>
  </section>
  
  }


  {
    //守護動物
  <section className="map-bg-img">
    <div className="container">


    <div className="row d-flex justify-content-between align-items-center">

      <div className="col-6 px-0">
        <img className="logos" src="https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1770488942942.png" alt="首頁動物地圖"/>
      </div>

      <div className="col-5 px-0">
        <h2 className="mb-0 title-text">守護​動物​的​每​一​步​</h2>

        <div className="fs-20 pt-32 mb-48">
          <p className="mb-12">透每​次​進行​動物​追蹤​都​會觸發 Pawarm Protection P​ing ​訊號。</p>

          <p className="mb-12">根據​我​們​合作​夥伴​制定​的​安全​規程，​訊號會​顯示​每​隻​動物​獨特追蹤路徑，​路徑​可能​是​即時​更新、​延遲​更新​或​歷史​記錄。</p>

          <p className="mb-0">雖然​您​跟​隨​動物​旅程​的​體驗​對​您​來說​仍然​相同，​但​我​們會​在​幕後​與​合作​夥伴​共同​努力，​確保以​安全​的​方式​呈現這​一​體驗，​一步​一步​地​保障​動物​的​安全。​</p>
        </div>

        
        <div className="row px-0 map-content">
          <div className="col-auto px-0 map-icon">
            <img src="./src/image/icon-GPS.png" alt="定位icon" />
          </div>

          <div className="col px-0 ">
            <p>透過GPS​項圈​和​運動​感應器​追蹤​相機，來​進​行定​位​追蹤​</p>
          </div>
        </div>


        <div className="row px-0 map-content">
          <div className="col-auto px-0 map-icon">
            <img src="./src/image/icon-shield.png" alt="定位icon" />
          </div>

          <div className="col px-0 ">
            <p>這隻動物的安全由 Pawarm Protection Ping 守護</p>
          </div>
        </div>
          
          
        

      </div>

    </div>

    </div>
  </section>
  

  }

  {
    //活動資訊
    <section className="bgImg-postion">
      <img className="bgImg-absolute" src="./src/image/bg-activity.png" alt="activity-BG"/>

      <div className="container">
        <h2 className="mb-32 px-0 title-text">活動資訊​</h2>

        <Activity />

        <button type="button" className="btn text-link text-primary-500 px-0 py-4 fs-18 fw-700">查看全部
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="ps-4" viewBox="0 0 15 15"><path fill="currentcolor" d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414Z"/></svg>
        </button>
      
      </div>
    </section>

  }



  {/*
  <ImgUpload />
  <ImgLibrary/>
  */}
  

  
  </>);
}