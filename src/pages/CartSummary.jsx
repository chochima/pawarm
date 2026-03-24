import toast from 'react-hot-toast';
import { NavLink } from "react-router";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ 
  cart, 
  currency, 
  isLogin, 
  couponCode, 
  setCouponCode, 
  applyCoupon, 
  removeCoupon 
}) => {
const navigate = useNavigate();

  return (
    <div className="col-lg-3">
      <div className="fs-36 fw-700 title-text-cart text-black mb-32">守護計畫</div>
      <div className="bg-gray-50 p-20 d-flex flex-column gap-20">
        
        {/* 商品總額 */}
        <div className="d-flex justify-content-between">
          <div className="fs-18 lh-base fw-500 text-gray-900">商品總額</div>
          <div className="fs-20 lh-base fw-500 text-gray-900">
            ${currency(cart?.total)}
          </div>
        </div>

        {/* 折扣顯示 (僅在有折扣時出現) */}
        {cart.final_total !== cart.total && (
          <div className="d-flex justify-content-between mb-2">
            <div className="fs-18 lh-base fw-500 text-gray-900">守護回饋碼</div>
            <div className="fs-20 lh-base fw-500">
              -${Math.round(cart.total - cart.final_total).toLocaleString()}
            </div>
          </div>
        )}
        
        {/* 折扣碼輸入區 */}
        <div className="mb-4">
          <hr />
          <div className="text-gray-500 mb-8">輸入守護回饋碼</div>
          
          {cart.final_total !== cart.total ? (
            <div className="d-flex justify-content-between align-items-center px-16 py-8 bg-gray-100 border rounded">
              <div className="fs-16 lh-base text-gray-300">
                {cart.carts?.[0]?.coupon?.title || "已套用折扣"}
              </div>
              <button 
                className="btn btn-sm p-0 border-0"
                onClick={() => removeCoupon()} 
              >
                <i className="bi bi-trash text-muted"></i>
              </button>
            </div>
          ) : (
            <div className="input-group input-group-sm">
              <input 
                type="text" 
                className="form-control" 
                placeholder="請輸入折扣碼" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button 
                className="btn btn-outline-dark" 
                type="button"
                onClick={() => applyCoupon(couponCode)}
              >
                套用
              </button>
            </div>
          )}
          <hr />
        </div>

        {/* 最終總額 */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <div className="fs-18 fw-bold text-gray-900">守護計畫總額</div>
            <div className="fs-14 text-gray-900">(不含運費)</div>
          </div>
          <div className="fw-bold mb-0 fs-28" style={{ color: '#b68d4c' }}>
            ${currency(cart?.final_total)}
          </div>
        </div>
          
        {/* 登入檢查與導向按鈕 */}
        {isLogin ? (
          <NavLink 
            to="/checkout"  
            className="btn-filled bg-primary-500 text-white fw-bold fs-18 px-44 py-16 text-center text-decoration-none shadow-sm transition-all"
          >
            下一步
          </NavLink>
        ) : (
          <button 
      onClick={() => {
        toast.error('守護生命前，請先登入會員', { 
          icon: '👤',
          duration: 2000 
        });
        setTimeout(() => {
          navigate('/login');
        }, 1200);
      }}
      className="btn-filled bg-gray-400 text-white fw-bold fs-18 px-44 py-16 text-center border-0"
      style={{ cursor: 'pointer' }} // 🚩 既然可以點擊跳轉，建議拿掉原本的 cursor-not-allowed
    >
      請先登入會員
    </button>
        )}

        {/* 保育贊助說明 */}
        <div className="fs-14 lh-base text-gray-500">
          ✨ 本次消費將贊助 ${currency(cart?.final_total * 0.15)} 給保育機構，感謝您的購買
        </div>
      </div>
    </div>
  );
};

export default CartSummary;