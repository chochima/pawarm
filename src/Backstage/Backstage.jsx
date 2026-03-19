import { Outlet, useNavigate, NavLink } from "react-router";
import axios from "axios";
import toast from 'react-hot-toast';

const{VITE_PATH,VITE_URL}=import.meta.env;

const Backstage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    await axios.post(`${VITE_URL}/v2/logout`);
    document.cookie = `hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    delete axios.defaults.headers.common.Authorization;
    toast.success('已安全登出後台', {
      position: 'top-center',
      style: { background: '#333', color: '#fff' },
      duration: 2000
    });

    // 5. 導向登入頁面
    navigate("/login");
  } catch (error) {
    const message = error.response?.data?.message || '登出發生未知錯誤';
    toast.error(`登出失敗: ${message}`);
    console.error("Logout Error:", error);
  }
};
  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* --- 左側側邊欄 --- */}
      <aside className="bg-dark text-white p-4 shadow" style={{ width: '260px' }}>
        <div className="d-flex align-items-center mb-5 ps-2">
          <i className="bi bi-shield-lock-fill fs-3 me-2 text-primary"></i>
          <span className="fs-4 fw-bold">PAWARM 後台</span>
        </div>

        <nav className="nav flex-column gap-2">
          <NavLink 
            to="/backstage/products" 
            className={({ isActive }) => `nav-link py-3 px-3 rounded-3 d-flex align-items-center ${isActive ? 'bg-primary text-white' : 'text-gray-400 hover-bg-dark text-white'}`}
          >
            <i className="bi bi-box-seam me-3"></i> 產品管理
          </NavLink>

          <NavLink 
            to="/backstage/coupon" 
            className={({ isActive }) => `nav-link py-3 px-3 rounded-3 d-flex align-items-center ${isActive ? 'bg-primary text-white' : 'text-gray-400 hover-bg-dark text-white'}`}
          >
            <i className="bi bi-ticket-perforated me-3"></i> 優惠券管理
          </NavLink>

          <NavLink 
            to="/backstage/order" 
            className={({ isActive }) => `nav-link py-3 px-3 rounded-3 d-flex align-items-center ${isActive ? 'bg-primary text-white' : 'text-gray-400 hover-bg-dark text-white'}`}
          >
            <i className="bi bi-cart-check me-3"></i> 訂單管理
          </NavLink>

          <hr className="my-4 opacity-25" />

          <NavLink 
            to="/" 
            className="nav-link py-3 px-3 rounded-3 text-white-50 d-flex align-items-center"
          >
            <i className="bi bi-house-door me-3"></i> 回前台首頁
          </NavLink>

          <button 
            onClick={handleLogout}
            className="nav-link py-3 px-3 rounded-3 text-danger border-0 bg-transparent text-start d-flex align-items-center"
          >
            <i className="bi bi-box-arrow-right me-3"></i> 安全登出
          </button>
        </nav>
      </aside>

      {/* --- 右側內容區 --- */}
      <main className="flex-grow-1 d-flex flex-column">
        {/* 頂部功能列 */}
        <header className="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold text-gray-700">管理中心</h5>
          <div className="d-flex align-items-center">
            <span className="me-3 fs-14 text-muted">管理員：Admin</span>
            <div className="rounded-circle bg-primary-100 p-2" style={{ width: '40px', height: '40px', display: 'grid', placeItems: 'center' }}>
              <i className="bi bi-person-fill text-primary"></i>
            </div>
          </div>
        </header>

        {/* 下層子路由內容 */}
        <section className="p-4 overflow-auto" style={{ maxHeight: 'calc(100vh - 70px)' }}>
          <div className="bg-white p-4 rounded-4 shadow-sm" style={{ minHeight: '80vh' }}>
            <Outlet />
          </div>
        </section>
      </main>

      {/* 簡單的 Hover CSS (可放在 CSS 檔) */}
      <style>{`
        .hover-bg-dark:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: white !important;
        }
        .nav-link {
          transition: all 0.3s ease;
        }
        .text-gray-400 { color: #adb5bd; }
      `}</style>
    </div>
  );
};

export default Backstage;