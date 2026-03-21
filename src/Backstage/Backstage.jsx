import { useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router";
import axios from "axios";
import toast from 'react-hot-toast';

const { VITE_PATH, VITE_URL } = import.meta.env;

const Backstage = () => {
  const navigate = useNavigate();
  // 🚩 控制側邊欄顯示狀態
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(`${VITE_URL}/v2/logout`);
      document.cookie = `hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      delete axios.defaults.headers.common.Authorization;
      toast.success('已安全登出');
      navigate("/login");
    } catch (error) {
      toast.error('登出失敗');
    }
  };

  return (
    <div className="d-flex overflow-hidden" style={{ height: '100vh', width: '100vw', backgroundColor: '#f8f9fa' }}>
      
      {/* 🚩 手機版遮罩：當側邊欄打開時，點擊右側暗色區塊可關閉 */}
      {isSidebarOpen && (
        <div 
          className="position-fixed fw-100 h-100 w-100 d-lg-none" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040, top: 0, left: 0 }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- 左側側邊欄 --- */}
      <aside 
        className={`bg-dark text-white p-4 shadow flex-shrink-0 sidebar-transition ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
        style={{ width: '260px', zIndex: 1050 }}
      >
        <div className="d-flex align-items-center justify-content-between mb-5 ps-2">
          <div className="d-flex align-items-center">
            <i className="bi bi-shield-lock-fill fs-3 me-2 text-primary"></i>
            <span className="fs-4 fw-bold">PAWARM</span>
          </div>
          {/* 手機版才顯示的關閉按鈕 */}
          <button className="btn btn-dark d-lg-none" onClick={() => setIsSidebarOpen(false)}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <nav className="nav flex-column gap-2" onClick={() => setIsSidebarOpen(false)}>
          <NavLink to="/backstage/products" className={({ isActive }) => `nav-link py-3 px-3 rounded-3 d-flex align-items-center ${isActive ? 'bg-primary text-white' : 'text-gray-400 hover-bg-dark text-white'}`}>
            <i className="bi bi-box-seam me-3"></i> 產品管理
          </NavLink>
          <NavLink to="/backstage/coupon" className={({ isActive }) => `nav-link py-3 px-3 rounded-3 d-flex align-items-center ${isActive ? 'bg-primary text-white' : 'text-gray-400 hover-bg-dark text-white'}`}>
            <i className="bi bi-ticket-perforated me-3"></i> 優惠券管理
          </NavLink>
          <NavLink to="/backstage/order" className={({ isActive }) => `nav-link py-3 px-3 rounded-3 d-flex align-items-center ${isActive ? 'bg-primary text-white' : 'text-gray-400 hover-bg-dark text-white'}`}>
            <i className="bi bi-cart-check me-3"></i> 訂單管理
          </NavLink>
          <NavLink to="/backstage/analysis" className={({ isActive }) => `nav-link py-3 px-3 rounded-3 d-flex align-items-center ${isActive ? 'bg-primary text-white' : 'text-gray-400 hover-bg-dark text-white'}`}>
            <i className="bi bi-bar-chart-line me-3"></i> 銷售數據
          </NavLink>
          <hr className="my-4 opacity-25" />
          <NavLink to="/" className="nav-link py-3 px-3 rounded-3 text-white-50 d-flex align-items-center"><i className="bi bi-house-door me-3"></i> 回首頁</NavLink>
          <button onClick={handleLogout} className="nav-link py-3 px-3 rounded-3 text-danger border-0 bg-transparent text-start d-flex align-items-center"><i className="bi bi-box-arrow-right me-3"></i> 安全登出</button>
        </nav>
      </aside>

      {/* --- 右側內容區 --- */}
      <main className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
        {/* 頂部功能列 */}
        <header className="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            {/* 🚩 漢堡選單按鈕：只在側邊欄關閉且小螢幕時明顯 */}
            <button 
              className="btn btn-light me-3 d-flex align-items-center" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <i className="bi bi-list fs-4"></i>
            </button>
            <h5 className="mb-0 fw-bold text-gray-700 d-none d-sm-block">管理中心</h5>
          </div>
          <div className="d-flex align-items-center">
            <span className="me-3 fs-14 text-muted d-none d-md-inline">管理員：Admin</span>
            <div className="rounded-circle bg-primary-100 p-2" style={{ width: '40px', height: '40px', display: 'grid', placeItems: 'center' }}>
              <i className="bi bi-person-fill text-primary"></i>
            </div>
          </div>
        </header>

        {/* 下層內容 */}
        <section className="p-3 p-md-4 overflow-auto" style={{ height: 'calc(100vh - 70px)' }}>
          <div className="bg-white p-3 p-md-4 rounded-4 shadow-sm" style={{ minHeight: '100%' }}>
            <Outlet />
          </div>
        </section>
      </main>

      <style>{`
        /* 側邊欄平滑過渡 */
        .sidebar-transition {
          transition: transform 0.3s ease, margin 0.3s ease;
        }

        /* 電腦版 (Lg 以上) 邏輯 */
        @media (min-width: 992px) {
          .sidebar-closed {
            margin-left: -260px;
          }
          .sidebar-open {
            margin-left: 0;
          }
        }

        /* 手機版 (Lg 以下) 邏輯 */
        @media (max-width: 991.98px) {
          .sidebar-transition {
            position: fixed;
            height: 100vh;
            top: 0;
            left: 0;
          }
          .sidebar-closed {
            transform: translateX(-100%);
          }
          .sidebar-open {
            transform: translateX(0);
          }
        }

        .hover-bg-dark:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: white !important;
        }
        .nav-link {
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .text-gray-400 { color: #adb5bd; }
        
        /* 🚩 徹底解決 X 軸問題 */
        body {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Backstage;