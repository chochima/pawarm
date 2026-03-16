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
    <div className="text-center" style={{ width: '120px' }}>
      <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto fs-18 
        ${isStep1 || isStep2 || isStep3 ? 'bg-brown text-white' : 'bg-light text-muted'}`} 
        style={{ width: '40px', height: '40px' }}>1</div>
      <p className={`mt-2 fs-20 fw-bold lh text-nowrap lh-base ${isStep1 || isStep2 || isStep3 ? 'text-brown' : 'text-muted'}`}>
        確認守護清單
      </p>
    </div>

    {/* 步驟 2  */}
    <div className="text-center" style={{ width: '120px' }}>
      <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto fs-18 
        ${isStep2 || isStep3 ? 'bg-brown text-white' : 'bg-light text-muted'}`} 
        style={{ width: '40px', height: '40px' }}>2</div>
      <p className={`mt-2 fs-20 fw-bold text-nowrap lh-base ${isStep2 || isStep3 ? 'text-brown' : 'text-muted'}`}>
        填寫安心地址
      </p>
    </div>

    {/* 步驟 3  */}
    <div className="text-center" style={{ width: '120px' }}>
      <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto fs-18 
        ${isStep3 ? 'bg-brown text-white' : 'bg-light text-muted'}`} 
        style={ { width: '40px', height: '40px' }}>3</div>
      <p className={`mt-2 fs-20 fw-bold text-nowrap lh-base ${isStep3 ? 'text-brown' : 'text-muted'}`}>
        啟動追蹤權限
      </p>
    </div>
  </div>
</div>
  );
};

export default CheckoutStepper;