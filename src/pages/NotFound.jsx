import { Link } from "react-router";
import "../style/all.scss";

const NotFound = () => {
  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center py-5">
        {/* 視覺圖示：可以用一個可愛的插圖或 Emoji */}
        <div className="display-1 text-primary-500 fw-bold mb-4">404</div>
        
        <div className="mb-4">
          <span className="fs-100">🐾</span>
        </div>

        <h2 className="fw-bold text-gray-900 mb-3">喔噴！這裡是一片荒野</h2>
        <p className="text-gray-500 fs-18 mb-48">
          看來這隻毛孩跑得太遠，我們找不到這個頁面。<br />
          別擔心，跟著腳印回到溫暖的家吧！
        </p>

        <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
          <Link 
            to="/" 
            className="btn btn-primary-500 text-white px-40 py-12 rounded-pill fw-bold shadow-sm"
          >
            回到首頁
          </Link>
          <Link 
            to="/products" 
            className="btn btn-outline-primary-500 px-40 py-12 rounded-pill fw-bold"
          >
            去逛逛計畫
          </Link>
        </div>

        {/* 裝飾性的小文字 */}
        <div className="mt-120 text-gray-300 fs-14">
          Error Code: PAGE_NOT_FOUND_BY_PAWARM
        </div>
      </div>

      <style>{`
        .fs-100 { font-size: 100px; }
        .mb-48 { margin-bottom: 48px; }
        .px-40 { padding-left: 40px; padding-right: 40px; }
        .py-12 { padding-top: 12px; padding-bottom: 12px; }
      `}</style>
    </div>
  );
};

export default NotFound;