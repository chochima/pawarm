/* eslint-disable react/prop-types */
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

  // 🚩 1. 判斷購物車是否為空
  const isCartEmpty = !cart.carts || cart.carts.length === 0;

  return (
    <div className="col-xl-3">
      <div className="fs-36 fw-700 title-text-cart text-black mb-32">守護計畫</div>
      <div className="bg-gray-50 p-20 d-flex flex-column gap-20">
        
        {/* 商品總額 */}
        <div className="d-flex justify-content-between">
          <div className="fs-18 lh-base fw-500 text-gray-900">商品總額</div>
          <div className="fs-20 lh-base fw-500 text-gray-900">
            ${currency(cart?.total)}
          </div>
        </div>

        {/* 折扣顯示 */}
        {cart.final_total !== cart.total && (
          <div className="d-flex justify-content-between mb-2 text-success">
            <div className="fs-18 lh-base fw-500">守護回饋碼</div>
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
                disabled={isCartEmpty} // 🚩 購物車空時也禁止輸入折扣碼
              />
              <button 
                className="btn btn-outline-dark" 
                type="button"
                onClick={() => applyCoupon(couponCode)}
                disabled={isCartEmpty || !couponCode}
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
          
        {/* 🚩 2. 登入檢查與購物車檢查 */}
        {!isLogin ? (
          // 未登入狀態：導向登入
          <button 
            type="button"
            onClick={() => {
              toast.error('守護生命前，請先登入會員', { 
                icon: '👤',
                duration: 2000 
              });
              setTimeout(() => navigate('/login'), 1200);
            }}
            className="btn-filled bg-gray-400 text-white fw-bold fs-18 px-44 py-16 text-center border-0"
          >
            請先登入會員
          </button>
        ) : isCartEmpty ? (
          // 已登入但購物車空：顯示下一步但 disabled
          <button 
            type="button"
            disabled
            className="btn-filled bg-gray-300 text-white fw-bold fs-18 px-44 py-16 text-center border-0"
            style={{ cursor: 'not-allowed' }}
          >
            購物車尚無品項
          </button>
        ) : (
          // 已登入且有品項：正常進入結帳
          <NavLink 
            to="/checkout"  
            className="btn-filled bg-primary-500 text-white fw-bold fs-18 px-44 py-16 text-center text-decoration-none shadow-sm transition-all"
          >
            下一步
          </NavLink>
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