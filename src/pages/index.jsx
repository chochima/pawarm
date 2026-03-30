import { NavLink } from "react-router";
import Activity from "../components/activity";
import LogoSwiper from "../components/LogoSwiper";
import ProductSwiper from "../components/ProductSwiper";

import bgActivity from "../image/bg-activity.png";
import bgProduct from "../image/bg-product.png";
import iconGPS from "../image/icon-GPS.png";
import iconShield from "../image/icon-shield.png";
import mapImg from "../image/map-img.png";

export default function Home() {
  return (
    <>
      {/* HERO CTA */}
      <section className="hero-bg-img">
        <div className="container">
          <div className="row px-0 pb-md-5">
            <div className="col col-md-6">
              <h2 className="mb-0 px-0 title-text text-primary-500">
                以最簡單的行動<br />
                為動物帶來真實的改變
              </h2>
              <p className="body-text pt-20 pt-md-32 px-0 mb-24 mb-md-48">
                你的每一次購買，都是對動物保育的貢獻。<br />
                透過真實動物追蹤，見證生命的軌跡。
              </p>
              <NavLink to="products">
                <button type="button" className="btn btn-outline-primary-500 btn-text btn-outline fs-14 px-36 px-md-44 py-14 py-md-16">
                  選擇我的動物
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* 推薦商品 */}
      <section className="bgImg-postion">
        <img className="bgImg-absolute" src={bgProduct} alt="product-BG" />
        <div className="container">
          <h2 className="mb-32 px-0 title-text">推薦商品</h2>
          <ProductSwiper />
        </div>
      </section>

      {/* 里程碑CTA */}
      <section className="milestone-section-bg">
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="col-auto col-md-6 px-0">
              <img className="w-100" src="https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1770228794274.png" alt="首頁里程碑" />
            </div>
            <div className="col col-md-5 px-md-0">
              <h2 className="mb-0 title-text">讓保育，<br />成為每個人都能開始的小行動</h2>
              <p className="body-text pt-20 pt-md-32 mb-24 mb-md-48">
                透過真實動物追蹤，不只能看到牠們的名字、故事和生活軌跡，也能親眼看見自己的支持如何帶來改變。
              </p>
              <NavLink to="milestone">
                <button type="button" className="btn btn-outline-primary-500 btn-text btn-outline fs-14 px-36 px-md-44 py-12 py-md-16">
                  我們的里程碑
                </button>
              </NavLink>
            </div>
          </div>
          <div className="row pt-48 pt-md-32">
            <LogoSwiper />
          </div>
        </div>
      </section>

      {/* 追蹤動物CTA */}
      <section className="track-bg-img">
        <div className="container">
          <div className="row px-0">
            <div className="col col-md-6">
              <h2 className="mb-0 px-0 title-text">解鎖動物的遷徙路徑</h2>
              <p className="fs-16 pt-32 px-0 mb-48 body-text">
                體驗激動人心的揭密、精彩的旅程，<br />
                為全球保育工作做出貢獻。
              </p>
              <NavLink to="animaltracking">
                <button type="button" className="btn btn-outline-primary-500 btn-text btn-outline fs-14 px-36 px-md-44 py-12 py-md-16">
                  追蹤我的動物
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* 守護動物 */}
      <section className="map-bg-img">
        <div className="container">
          <div className="row d-flex justify-content-between align-items-center">
            <div className="col-lg-6 pb-24">
              <img className="logos w-100" src={mapImg} alt="首頁動物地圖" />
            </div>
            <div className="col col-lg-5">
              <h2 className="mb-0 title-text">守護動物的每一步</h2>
              <div className="fs-16 body-text pt-20 pt-lg-32 mb-32 mb-lg-48">
                <p className="mb-12">每次進行動物追蹤都會觸發 Pawarm Protection Ping 訊號。</p>
                <p className="mb-12">根據我們合作夥伴制定的安全規程，訊號會顯示每隻動物獨特追蹤路徑，路徑可能是即時更新、延遲更新或歷史記錄。</p>
                <p className="mb-0">雖然您跟隨動物旅程的體驗對您來說仍然相同，但我們會在幕後與合作夥伴共同努力，確保以安全的方式呈現這一體驗，一步一步地保障動物的安全。</p>
              </div>
              <div className="row map-content pe-0">
                <div className="col-auto map-icon pe-0">
                  <img src={iconGPS} alt="定位icon" />
                </div>
                <div className="col ps-0">
                  <p>透過GPS項圈和運動感應器追蹤相機，來進行定位追蹤</p>
                </div>
              </div>
              <div className="row map-content pe-0">
                <div className="col-auto map-icon pe-0">
                  <img src={iconShield} alt="防護icon" />
                </div>
                <div className="col ps-0">
                  <p>這隻動物的安全由 Pawarm Protection Ping 守護</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 活動資訊 */}
      <section className="bgImg-postion">
        <img className="bgImg-absolute" src={bgActivity} alt="activity-BG" />
        <div className="container">
          <h2 className="mb-20 mb-md-32 px-0 title-text">活動資訊</h2>
          <Activity />
          <div className="d-flex justify-content-end justify-content-md-start">
            <NavLink to="#" className="btn text-link text-primary-500 px-0 py-4 fs-14 fw-700 text-end d-flex align-items-center">
              查看全部
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="ps-4" viewBox="0 0 15 15">
                <path fill="currentcolor" d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414Z" />
              </svg>
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
}