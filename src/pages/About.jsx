import 'animate.css';
import { NavLink } from 'react-router-dom';

const About = () => {
  const coreValues = [
    { 
      title: "全球保育串聯", 
      desc: "從台北市立動物園到世界自然基金會(WWF)，我們與全球頂尖保育機構合作，確保資源精準投入。", 
      icon: "bi-globe-americas" 
    },
    { 
      title: "100% 棲地守護", 
      desc: "我們承諾將收益資助對應物種的 GPS 追蹤技術與棲地復育計畫。", 
      icon: "bi-shield-fill-check" 
    },
    { 
      title: "真實數據見證", 
      desc: "您可以透過專屬代碼查看計畫進度，掌握穿山甲或雪豹在野外的遷徙路徑。", 
      icon: "bi-graph-up-arrow" 
    }
  ];

  return (
    <div className="about-page bg-white overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="position-relative py-120 bg-primary-600 text-white">
        <div className="container position-relative z-2">
          <div className="row g-0 align-items-center">
            <div className="col-lg-7 animate__animated animate__fadeInLeft">
              <h1 className="display-4 fw-bold mb-4">用愛，<br/>串連每一份守護的力量</h1>
              <p className="fs-20 mb-32 text-white-50">
                在 Pawarm，我們相信每一份精緻的紀念，都能轉化為守護生命的力量。<br />
                您的每一次關注與購買，都是對全球野生動物保育的實質貢獻。
              </p>
              <NavLink to="/products" className="btn btn-light btn-lg rounded-pill px-40 fw-bold text-primary-600 shadow-sm">
                探索守護計畫
              </NavLink>
            </div>
          </div>
        </div>
        <div className="position-absolute end-0 bottom-0 opacity-25 d-none d-lg-block" style={{ transform: 'translate(15%, 15%)' }}>
          <i className="bi bi-water text-white" style={{ fontSize: '450px', lineHeight: 1 }}></i>
        </div>
      </section>

      {/* 2. Mission Section */}
      <section className="py-80">
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-6 animate__animated animate__zoomIn">
              <div className="rounded-4 overflow-hidden shadow-lg border border-5 border-white">
                <img 
                  src="https://plus.unsplash.com/premium_photo-1661830833851-a545aa10211d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="台灣穿山甲在野外" 
                  className="img-fluid w-100 object-fit-cover"
                  style={{ height: '480px' }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold text-primary-600 mb-24">守護生命，從擁有一份紀念開始</h2>
              <p className="text-gray-600 fs-18 mb-4">
                無論是棲地破碎化的<strong>台灣穿山甲</strong>（如左圖），還是因氣候變遷失去海冰的<strong>北極熊</strong>。我們思考：如何讓大眾能更直接且持久地支持這些生命？
              </p>
              <div className="border-start border-4 border-primary-400 ps-4 py-2 mb-4 bg-primary-50">
                <h5 className="fw-bold text-primary-700">我們的初衷</h5>
                <p className="mb-0 text-gray-700 italic">「讓保育不再遙遠，而是手中一份溫暖且具有意義的質感紀念。」</p>
              </div>
              <p className="text-gray-600 fs-18 mb-0">
                我們提供一個整合平台，讓大眾能輕鬆搜尋到最需要幫助的動物，並與<strong>成都大熊貓繁育基地、Snow Leopard Trust</strong> 等專業機構合作，確保資源分配的正義。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values - 修正點：加大間距 (g-lg-5) 並美化卡片 */}
      <section className="py-120 bg-gray-50">
        <div className="container text-center">
          <h2 className="fw-bold mb-60">我們如何實現改變</h2>
          {/* 使用 g-4 (手機) 到 g-xl-5 (桌機) 的響應式間距 */}
          <div className="row g-4 g-xl-5 justify-content-center">
            {[
              { 
                title: "台灣淺山守護", 
                img: "https://plus.unsplash.com/premium_photo-1664302811081-f814458b856d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
                desc: "資助台灣石虎保育協會，進行棲地巡護與紅外線監測。"
              },
              { 
                title: "極地與海洋監測", 
                img: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?q=80&w=800&auto=format&fit=crop", 
                desc: "與 PBI 合作追蹤北極熊；資助海洋探索中心監測座頭鯨遷徙。"
              },
              { 
                title: "高山幽靈追蹤", 
                img: "https://plus.unsplash.com/premium_photo-1661952443167-05d723e6bb3a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
                desc: "資助 Snow Leopard Trust，建立人豹共存社區與 GPS 監測。"
              }
            ].map((value, index) => (
              <div className="col-md-6 col-lg-4 mb-4" key={index}>
                <div className="card h-100 border-0 shadow-sm hover-shadow-lg overflow-hidden rounded-4 transition-all">
                  <div className="overflow-hidden">
                    <img src={value.img} className="card-img-top object-fit-cover transition-transform-hover" style={{ height: '240px' }} alt={value.title} />
                  </div>
                  <div className="card-body p-4 text-start">
                    <h5 className="fw-bold mb-3 text-success-800">{value.title}</h5>
                    <p className="text-gray-500 fs-16 mb-0 lh-base">{value.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 物種範圍統計 */}
      <section className="py-80 bg-primary-50">
        <div className="container">
          <div className="row g-4 text-center">
            {[
              { num: "12+", label: "守護物種系列" },
              { num: "10+", label: "全球合作機構" },
              { num: "24/7", label: "GPS 技術追蹤" },
              { num: "100%", label: "專款專用原則" }
            ].map((stat, i) => (
              <div className="col-6 col-md-3" key={i}>
                <div className="display-5 fw-bold text-primary-600">{stat.num}</div>
                <div className="text-gray-600 fw-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-120 position-relative text-white overflow-hidden" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=2000&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="container position-relative z-2 text-center animate__animated animate__pulse animate__infinite animate__slow">
          <h2 className="display-6 fw-bold mb-24">挑選屬於您的守護對象</h2>
          <p className="fs-18 mb-40 opacity-75 mx-auto" style={{ maxWidth: '600px' }}>您可以帶走石虎、雪豹或座頭鯨的質感紀念，同時實質推動全球合作機構進行真實的救援與追蹤。</p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <NavLink to="/products" className="btn btn-warning btn-lg rounded-pill px-5 fw-bold text-dark shadow-sm">前往選購</NavLink>
            <NavLink to="/contact" className="btn btn-outline-light btn-lg rounded-pill px-5 fw-bold">聯繫團隊</NavLink>
          </div>
        </div>
      </section>

      <style>{`
        .overflow-hidden { overflow-x: hidden; }
        .py-120 { padding-top: 120px; padding-bottom: 120px; }
        .py-80 { padding-top: 80px; padding-bottom: 80px; }
        .transition-all { transition: all 0.3s ease-in-out; }
        .hover-shadow-lg:hover { 
          transform: translateY(-12px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,0.1) !important;
        }
        .transition-transform-hover { transition: transform 0.5s ease; }
        .card:hover .transition-transform-hover { transform: scale(1.08); }
        .object-fit-cover { object-fit: cover; }
        
        .text-primary-600 { color: #2D5A27; } 
        .bg-primary-600 { background-color: #2D5A27; }
        .bg-primary-50 { background-color: #F4F9F4; }
        .text-primary-700 { color: #1B3617; }
        .border-primary-400 { border-color: #4A8542 !important; }
        .text-success-800 { color: #2D5A27; }
        
        .btn-warning { background-color: #F1C40F; border-color: #F1C40F; }
        .btn-warning:hover { background-color: #D4AC0D; }

        @media (max-width: 768px) {
          .display-4 { font-size: 2.2rem; }
          .py-120 { padding-top: 80px; padding-bottom: 80px; }
        }
      `}</style>
    </div>
  );
};

export default About;