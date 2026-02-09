import { useLocation } from 'react-router-dom';

const CheckoutStepper = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // 判斷當前步驟的邏輯
  const isStep1 = pathname.includes('carts');     // 第一步：購物車清單
  const isStep2 = pathname.includes('checkout'); // 第二步：填寫資料
  const isStep3 = pathname.includes('success');  // 第三步：完成訂單

  return (
    <div className="stepper-wrapper my-5">
  {/* 這條是線 */}
  <div className="stepper-line"></div>

  <div className="d-flex justify-content-between">
    {/* 步驟 1 */}
    <div className="text-center" style={{ width: '80px' }}>
      <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto 
        ${isStep1 || isStep2 || isStep3 ? 'bg-brown text-white' : 'bg-light text-muted'}`} 
        style={{ width: '40px', height: '40px' }}>1</div>
      <p className={`mt-2 fs-14 fw-bold ${isStep1 || isStep2 || isStep3 ? 'text-brown' : 'text-muted'}`}>
        確認守護清單
      </p>
    </div>

    {/* 步驟 2 ... 依此類推 */}
    <div className="text-center" style={{ width: '80px' }}>
      <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto 
        ${isStep2 || isStep3 ? 'bg-brown text-white' : 'bg-light text-muted'}`} 
        style={{ width: '40px', height: '40px' }}>2</div>
      <p className={`mt-2 fs-14 fw-bold ${isStep2 || isStep3 ? 'text-brown' : 'text-muted'}`}>
        填寫安心地址
      </p>
    </div>

    {/* 步驟 3 ... 依此類推 */}
    <div className="text-center" style={{ width: '80px' }}>
      <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto 
        ${isStep3 ? 'bg-brown text-white' : 'bg-light text-muted'}`} 
        style={{ width: '40px', height: '40px' }}>3</div>
      <p className={`mt-2 fs-14 fw-bold ${isStep3 ? 'text-brown' : 'text-muted'}`}>
        啟動追蹤權限
      </p>
    </div>
  </div>
</div>
  );
};

export default CheckoutStepper;