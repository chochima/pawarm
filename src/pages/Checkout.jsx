
import { useState, useEffect} from "react";
import  axios from 'axios'




import { currency} from"../utils/filter";
import CheckoutStepper from "../components/Stepper";
import CheckoutForm from "../components/CheckoutForm";




const{VITE_PATH,VITE_URL}=import.meta.env;



const Checkout=()=>{
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  



  
 


  




  //購物車
  const getCart = async () => {
    try {
      const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/cart`);
      console.log(res)
      setCart(res.data.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };


  // 套用優惠券
const applyCoupon = async (code) => {
  try {
    const res = await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/coupon`, {
      data: { code }
    });
    alert(res.data.message);
    getCart(); 
  } catch (err) {
    alert(err.response?.data?.message || "套用失敗");
  }
};


const removeCoupon = () => {
  // 1. 強制讓前端顯示回原價（但不改動 API 資料庫）
  setCart(prev => ({
    ...prev,
    final_total: prev.total // 把折扣後的金額補回原價
  }));
  
  // 2. 讓 UI 切換回「輸入框」模式
  setCouponCode(""); 
  
  alert("已暫時移除優惠（注意：重新整理後可能會恢復）");
};


  
  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
    <div className="container my-5 overflow-hidden">
        <CheckoutStepper />

   

  {/* 購物車 */}
  <div className="row gx-60">
    <div className="col-md-9">
      
      <div className="fs-36 fw-700 title-text-cart text-black mb-32">守護清單</div>

      <div className="card-body d-none d-md-block">
      <table className="table align-middle">
        <thead className="">
          <tr>
            <th width="400">守護清單</th>
            <th width="120" className="text-start">單價</th>
            <th width="160" className="text-center">數量</th>
            <th width="120" className="text-start">小計</th>
            
          </tr>
        </thead>
        <tbody>
          {cart?.carts?.map((item) => (
            <tr key={item.id}>
              <td> {/* 考慮到有圖片和長文字，這欄可以寬一點 */}
  <div className="d-flex align-items-center">
    <img 
      src={item.product.imageUrl} 
      alt={item.product.title}
      className="object-fit-cover mr-3"
      style={{ width: '100px', height: '100px' }} // 固定縮圖大小
    />
    <div>
      <div className="fs-20 lh-base fw-bold">{item.product.title}</div>
      <div className="fs-16 lh-base fw-400 text-gray-500">{item.product.agency}</div> 
      {/* 畫面上的 Polar Bears International 可以放在這裡 */}
    </div>
  </div>
              </td>

              <td>${currency(item.product.price)}</td>

              <td>
                <div className="d-flex align-items-center justify-content-center">
 
  
  <span className="mx-3 fw-bold">{item.qty}</span>
  
 
</div>
              </td>

              <td className="text-start fw-bold">
                ${currency(item.final_total)}
              </td>

             
            </tr>
          ))}
        </tbody>

      </table>
     </div>
     {/* 手機版*/}
     <div className="d-md-none">
  {cart.carts?.map((item) => (
    <div key={item.id} className="py-3 border-bottom">
      <div className="d-flex gap-3">
        {/* 左側：商品圖片 */}
        <div style={{ width: '80px', height: '80px' }}>
          <img 
            src={item.product.imageUrl} 
            className="w-100 h-100 object-fit-cover rounded" 
            alt={item.product.title} 
          />
        </div>

        {/* 右側：標題、類別與操作按鈕 */}
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h6 className="fw-bold mb-1">{item.product.title}</h6>
              <p className="text-muted small mb-0">{item.product.agency}</p>
            </div>
  
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
             <div className="d-flex align-items-center justify-content-center">
 
  <span className="mx-3 fw-bold">{item.qty}份</span>
</div>
            <span className="fw-bold">${item.total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  ))}
    </div>

    </div>
    <div className="col-md-3 ">
      <div className="fs-36 fw-700 title-text-cart text-black mb-32">守護計畫</div>
      <div className="bg-gray-50 p-20 d-flex flex-column gap-20">
        <div className="d-flex  justify-content-between">
          <div className="fs-18 lh-base fw-500 text-gray-900">商品總額</div>
          <div className="fs-20 lh-base fw-500 text-gray-900">${currency(cart?.total)}</div>
        </div>
        {cart.final_total !== cart.total && (
  <div className="d-flex justify-content-between mb-2">
    <div className="fs-18 lh-base fw-500 text-gray-900">
      守護回饋碼 
    </div>
    <div className="fs-20 lh-base fw-500 ">
      {/* 計算折扣差額 */}
      -${Math.round(cart.total - cart.final_total).toLocaleString()}
    </div>
  </div>
)}
        
       <div className="mb-4">
  <hr />
  <div className="text-gray-500 mb-8">輸入守護回饋碼</div>
  
  {/* 優惠券 */}
  {cart.final_total !== cart.total ? (
    <div className="d-flex justify-content-between align-items-center  px-16 py-8 bg-gray-100  border rounded">
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
    /* 如果沒套用，則顯示輸入框 */
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


  <div className="d-flex justify-content-between align-items-center mb-4">
    <div>
      <div className="fs-18 fw-bold text-gray-900">守護計畫總額</div>
      <div className="fs-14 text-gray-900">(不含運費)</div>
    </div>
    
    <div className="fw-bold mb-0 fs-28" style={{ color: '#b68d4c' }}>${currency(cart?.final_total)}</div>
  </div>
       <div className="fs-14 lh-base text-gray-500">✨ 本次消費將贊助 ${currency(cart?.final_total*0.15)} 給保育機構，感謝您的購買</div>
      </div>
    </div>
  </div>
  
  
   </div>

   <CheckoutForm cart={cart} getCart={getCart}/>




    </>
    


  )
}

export default Checkout;