import { useEffect, useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router";
import axios from "axios";
import toast from 'react-hot-toast';

const { VITE_URL } = import.meta.env;

const Backstage = () => {
  const navigate = useNavigate();
  // 🚩 1. 權限狀態：預設 false，驗證通過才放行
  const [isAuth, setIsAuth] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 🚩 2. 統一驗證邏輯 (老師建議的重點)
  useEffect(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    
    if (!token) {
      toast.error("管理員請先登入");
      navigate("/login");
      return;
    }

    // 設定全域 Header
    axios.defaults.headers.common.Authorization = token;

    const checkAdmin = async () => {
      try {
        await axios.post(`${VITE_URL}/v2/api/user/check`);
        setIsAuth(true); // 🚩 驗證成功
      } catch (err) {
        toast.error("身分驗證失效，請重新登入");
        navigate("/login");
      }
    };
    checkAdmin();
  }, [navigate]);

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

  // 🚩 3. 驗證中不顯示內容，避免畫面閃爍 (Flash of Unauthenticated Content)
  if (!isAuth) {
    return (
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white">
        <div className="spinner-border text-primary mb-3" role="status"></div>
        <div className="fs-5 fw-bold">身分識別中...</div>
      </div>
    );
  }

  return (
    <div className="d-flex overflow-hidden" style={{ height: '100vh', width: '100vw', backgroundColor: '#f8f9fa' }}>
      
      {/* 手機版遮罩 */}
      {isSidebarOpen && (
        <div 
          className="position-fixed h-100 w-100 d-lg-none" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040, top: 0, left: 0 }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 左側側邊欄 */}
      <aside 
        className={`bg-dark text-white p-4 shadow flex-shrink-0 sidebar-transition ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
        style={{ width: '260px', zIndex: 1050 }}
      >
        <div className="d-flex align-items-center justify-content-between mb-5 ps-2">
          <div className="d-flex align-items-center">
            <i className="bi bi-shield-lock-fill fs-3 me-2 text-primary"></i>
            <span className="fs-4 fw-bold">PAWARM</span>
          </div>
          <button className="btn btn-dark d-lg-none" onClick={() => setIsSidebarOpen(false)}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <nav className="nav flex-column gap-2" onClick={() => setIsSidebarOpen(false)}>
          <NavLink to="/backstage/products" className={({ isActive }) => `nav-link py-3 px-3 rounded-3 d-flex align-items-center ${isActive ? 'bg-primary text-white shadow' : 'text-white-50 hover-bg-dark'}`}>
            <i className="bi bi-box-seam me-3"></i> 產品管理
          </NavLink>
          <NavLink to="/backstage/coupon" className={({ isActive }) => `nav-link py-3 px-3 rounded-3 d-flex align-items-center ${isActive ? 'bg-primary text-white shadow' : 'text-white-50 hover-bg-dark'}`}>
            <i className="bi bi-ticket-perforated me-3"></i> 優惠券管理
          </NavLink>
          <NavLink to="/backstage/order" className={({ isActive }) => `nav-link py-3 px-3 rounded-3 d-flex align-items-center ${isActive ? 'bg-primary text-white shadow' : 'text-white-50 hover-bg-dark'}`}>
            <i className="bi bi-cart-check me-3"></i> 訂單管理
          </NavLink>
          <NavLink to="/backstage/analysis" className={({ isActive }) => `nav-link py-3 px-3 rounded-3 d-flex align-items-center ${isActive ? 'bg-primary text-white shadow' : 'text-white-50 hover-bg-dark'}`}>
            <i className="bi bi-bar-chart-line me-3"></i> 銷售數據
          </NavLink>
          <hr className="my-4 opacity-25" />
          <NavLink to="/" className="nav-link py-3 px-3 rounded-3 text-white-50 d-flex align-items-center hover-bg-dark">
            <i className="bi bi-house-door me-3"></i> 回前台首頁
          </NavLink>
          <button onClick={handleLogout} className="nav-link py-3 px-3 rounded-3 text-danger border-0 bg-transparent text-start d-flex align-items-center hover-bg-dark w-100">
            <i className="bi bi-box-arrow-right me-3"></i> 安全登出
          </button>
        </nav>
      </aside>

      {/* 右側內容區 */}
      <main className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
        <header className="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center shadow-sm">
          <div className="d-flex align-items-center">
            <button className="btn btn-light me-3 border shadow-sm" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <i className="bi bi-list fs-4"></i>
            </button>
            <h5 className="mb-0 fw-bold text-dark d-none d-sm-block">管理控制台</h5>
          </div>
          <div className="d-flex align-items-center">
            <span className="me-3 fs-14 text-muted d-none d-md-inline">管理員：Admin</span>
            <div className="rounded-circle bg-primary bg-opacity-10 p-2 border border-primary border-opacity-25" style={{ width: '40px', height: '40px', display: 'grid', placeItems: 'center' }}>
              <i className="bi bi-person-fill text-primary"></i>
            </div>
          </div>
        </header>

        {/* 下層內容 (Outlet) */}
        <section className="p-3 p-md-4 overflow-auto" style={{ height: 'calc(100vh - 70px)' }}>
          <div className="bg-white p-3 p-md-4 rounded-4 shadow-sm border" style={{ minHeight: '100%' }}>
            <Outlet />
          </div>
        </section>
      </main>

      <style>{`
        .sidebar-transition {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (min-width: 992px) {
          .sidebar-closed { margin-left: -260px; }
          .sidebar-open { margin-left: 0; }
        }
        @media (max-width: 991.98px) {
          .sidebar-transition { position: fixed; height: 100vh; top: 0; left: 0; }
          .sidebar-closed { transform: translateX(-100%); }
          .sidebar-open { transform: translateX(0); }
        }
        .hover-bg-dark:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
          color: white !important;
        }
        .nav-link { transition: all 0.2s ease; white-space: nowrap; }
        body { overflow: hidden; }
      `}</style>
    </div>
  );
};

export default Backstage;