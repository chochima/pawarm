import React from 'react';
import { NavLink } from 'react-router-dom';
import 'animate.css';

const Events = () => {
  const eventCategories = [
    {
      id: "live",
      title: "現場直擊：野外監測站",
      subtitle: "REAL-TIME MONITORING",
      img: "https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?q=80&w=2134&auto=format&fit=crop",
      date: "每周五 20:00 線上直播",
      desc: "透過裝設於雪山山脈的熱顯像攝影機，與保育員一同觀察石虎與長鬃山羊的夜間活動。",
      linkText: "預約直播提醒"
    },
    {
      id: "mission",
      title: "限時守護：海龜產卵季",
      subtitle: "SEASONAL MISSION",
      img: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?q=80&w=2071&auto=format&fit=crop",
      date: "2026.05 - 2026.08",
      desc: "每年的這段時間是綠蠵龜上岸產卵的高峰期。我們正招募志工進行深夜巡邏，防止人為干擾與燈光誤導。",
      linkText: "查看志工報名"
    },
    {
      id: "workshop",
      title: "工作坊：微縮生態瓶製作",
      subtitle: "ECO-WORKSHOP",
      img: "https://images.unsplash.com/photo-1603451670728-e8b944dae5a9?q=80&w=443&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2026.06.12 台北場",
      desc: "學習如何利用廢棄玻璃容器建立微型生態系統，所得費用將全數資助棲地復育基金。",
      linkText: "線上報名"
    }
  ];

  return (
    <div className="events-page bg-dark overflow-hidden">
      
      {/* 1. 全螢幕震撼 Header */}
      <section className="vh-100 position-relative d-flex align-items-center justify-content-center text-white">
        <div className="position-absolute w-100 h-100 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop" 
            className="w-100 h-100 object-fit-cover opacity-50" 
            alt="Forest" 
          />
        </div>
        <div className="container position-relative z-1 text-center animate__animated animate__fadeInUp">
          <h6 className="text-uppercase tracking-widest text-warning mb-3">Keep Life Wild</h6>
          <h1 className="display-1 fw-bold mb-4 mt-2">行動，<br/>讓改變發生。</h1>
          <p className="fs-18 opacity-75 mx-auto" style={{ maxWidth: '600px' }}>
            不只是購買，而是親身參與。從線上監測到實地復育，在這裡找到你可以貢獻力量的方式。
          </p>
          <div className="mt-5">
            <a href="#active-events" className="scroll-down text-white">
              <i className="bi bi-chevron-down fs-1"></i>
            </a>
          </div>
        </div>
      </section>

      {/* 2. 側邊標題風格列表 - 解決切版不好看的問題 */}
      <section id="active-events" className="py-120 bg-white rounded-top-5">
        <div className="container">
          <div className="row mb-100 align-items-end">
            <div className="col-md-6">
              <h2 className="display-4 fw-bold text-success-800">近期保育活動</h2>
            </div>
            <div className="col-md-6 text-md-end text-muted">
              目前共有 3 個進行中計畫 / 5 個已達成目標
            </div>
          </div>

          {/* 活動項目：交錯佈局 */}
          {eventCategories.map((event, index) => (
            <div className={`row align-items-center mb-120 animate__animated ${index % 2 === 0 ? 'animate__fadeInLeft' : 'animate__fadeInRight'}`} key={event.id}>
              <div className={`col-lg-7 ${index % 2 === 0 ? '' : 'order-lg-2'}`}>
                <div className="event-img-wrapper position-relative overflow-hidden rounded-4 shadow-2xl">
                  <img src={event.img} className="img-fluid w-100 object-fit-cover" style={{ height: '500px' }} alt={event.title} />
                  <div className="img-overlay"></div>
                </div>
              </div>
              <div className={`col-lg-5 p-lg-5 ${index % 2 === 0 ? '' : 'order-lg-1'}`}>
                <div className="ps-lg-4">
                  <span className="text-warning fw-bold tracking-widest">{event.subtitle}</span>
                  <h3 className="display-6 fw-bold mt-2 mb-4 text-success-900">{event.title}</h3>
                  <div className="d-flex align-items-center mb-4 text-muted">
                    <i className="bi bi-calendar-event me-2"></i> {event.date}
                  </div>
                  <p className="fs-18 text-gray-600 mb-40 lh-lg">
                    {event.desc}
                  </p>
                  <button className="btn btn-outline-dark btn-lg rounded-0 px-5 transition-all">
                    {event.linkText} <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 數據看板 - 強調「真實性」 */}
      <section className="py-100 bg-success-900 text-white">
        <div className="container">
            <div className="row g-5 text-center">
                <div className="col-md-4">
                    <i className="bi bi-broadcast fs-1 text-warning mb-3 d-block"></i>
                    <h4 className="fw-bold">24HR</h4>
                    <p className="opacity-50">棲地影像即時傳輸</p>
                </div>
                <div className="col-md-4 border-start border-white border-opacity-10">
                    <i className="bi bi-people fs-1 text-warning mb-3 d-block"></i>
                    <h4 className="fw-bold">1,200+</h4>
                    <p className="opacity-50">參與志工人次</p>
                </div>
                <div className="col-md-4 border-start border-white border-opacity-10">
                    <i className="bi bi-pin-map fs-1 text-warning mb-3 d-block"></i>
                    <h4 className="fw-bold">42</h4>
                    <p className="opacity-50">全球監測座標點</p>
                </div>
            </div>
        </div>
      </section>

      {/* 4. 歷史成就 - 更多例子 */}
      <section className="py-120 bg-gray-50">
          <div className="container">
              <h4 className="fw-bold mb-5 text-center text-success-800">已達成計畫里程碑</h4>
              <div className="row g-4">
                  <div className="col-md-6 col-lg-3">
                      <div className="achievement-card p-4 bg-white rounded-4 shadow-sm h-100 border-bottom border-4 border-success">
                          <img src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop" className="img-fluid rounded mb-3" alt="海龜" />
                          <h6 className="fw-bold">小琉球海龜友善季</h6>
                          <p className="small text-muted mb-0">清理海洋垃圾超過 500 公斤。</p>
                      </div>
                  </div>
                  <div className="col-md-6 col-lg-3">
                      <div className="achievement-card p-4 bg-white rounded-4 shadow-sm h-100 border-bottom border-4 border-info">
                        <img src="https://images.unsplash.com/photo-1541414779316-956a5084c0d4?q=80&w=1965&auto=format&fit=crop" className="img-fluid rounded mb-3" alt="鯨魚" />
                        <h6 className="fw-bold">座頭鯨聲學研究</h6>
                        <p className="small text-muted mb-0">部署深海收音設備完成。</p>
                      </div>
                  </div>
                  {/* 可以根據你的 JSON 商品再增加更多歷史例子 */}
              </div>
          </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;700&display=swap');
        
        body { font-family: 'Noto Sans TC', sans-serif; }
        .bg-success-900 { background-color: #1a3a1f; }
        .text-success-800 { color: #2D5A27; }
        .text-success-900 { color: #1a3a1f; }
        .bg-dark { background-color: #0d0d0d !important; }
        
        .vh-100 { height: 100vh; }
        .py-120 { padding-top: 120px; padding-bottom: 120px; }
        .mb-120 { margin-bottom: 120px; }
        .tracking-widest { letter-spacing: 0.2em; }
        
        .rounded-top-5 { border-top-left-radius: 3rem; border-top-right-radius: 3rem; }
        
        .event-img-wrapper img {
            transition: transform 0.8s cubic-bezier(0.2, 1, 0.3, 1);
        }
        .event-img-wrapper:hover img {
            transform: scale(1.05);
        }
        
        .achievement-card { transition: transform 0.3s ease; }
        .achievement-card:hover { transform: translateY(-5px); }
        
        .scroll-down {
            animation: bounce 2s infinite;
            display: inline-block;
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
            40% {transform: translateY(-10px);}
            60% {transform: translateY(-5px);}
        }

        @media (max-width: 991px) {
            .display-1 { font-size: 4rem; }
            .mb-120 { margin-bottom: 60px; }
        }
      `}</style>
    </div>
  );
};

export default Events;