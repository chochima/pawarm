import axios from 'axios';
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { createAsyncGetCart } from "../slice/cartSlice";

const { VITE_PATH, VITE_URL } = import.meta.env;

const CheckoutForm = ({ cart, getCart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      delivery: "宅配",
      payment: "信用卡",
      invoiceType: "二聯式",
      invoiceTool: "會員載具",
    },
    mode: "onTouched"
  });

  const watchDelivery = watch("delivery");
  const watchPayment = watch("payment");
  const watchInvoiceType = watch("invoiceType");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (!cart?.carts?.length) {
        toast.error("購物車內尚無守護品項！");
        return;
      }

      const { 
        name, email, tel, address, note, 
        delivery, payment, invoiceType, invoiceTool, taxId 
      } = data;

      const orderData = {
        data: {
          user: { 
            name, email, tel, address, delivery, payment,
            invoice: { 
              type: invoiceType, 
              tool: invoiceTool, 
              taxId: invoiceType === "三聯式" ? taxId : "" 
            }
          },
          message: note || '無備註'
        }
      };

      const res = await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/order`, orderData);
      
      if (res.data.success) {
        const { orderId } = res.data;
        toast.success("訂單已送出！感謝您的暖心支持。");
        reset();   
        getCart(); 
        dispatch(createAsyncGetCart()); // 同步更新 Redux 狀態
        navigate(`/checkout-success/${orderId}`);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "訂單送出失敗，請檢查網路連線。";
      toast.error(msg);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="overflow-x-hidden">
      {/* --- 運送與方式選擇區 --- */}
      <div className="py-60 bg-gray-50 rounded-5 mb-5 shadow-sm border mx-2 mx-md-0">
        <div className="container">
          <div className="row mx-0 g-5">
            <div className="col-md-4 d-flex flex-column gap-4">
              <div>
                <label htmlFor="delivery" className="fs-32 fw-700 title-text-cart text-black mb-24 d-block cursor-pointer">運送方式</label>
                <select id="delivery" className="form-select bg-gray-100 border-0 py-12 rounded-3" {...register("delivery")}>
                  <option value="宅配">宅配 (黑貓/新竹物流)</option>
                  <option value="7-11">7-11 超商取貨</option>
                  <option value="FamilyMart">全家超商取貨</option>
                </select>
              </div>

              <div>
                <label htmlFor="payment" className="fs-32 fw-700 title-text-cart text-black mb-24 d-block cursor-pointer">付款方式</label>
                <select id="payment" className="form-select bg-gray-100 border-0 py-12 rounded-3" {...register("payment")}>
                  <option value="信用卡">信用卡 (一次付清)</option>
                  <option value="LINEPay">LINE Pay</option>
                  <option value="ATM">ATM 虛擬帳號</option>
                  <option value="COD">貨到付款</option>
                </select>
              </div>
            </div>

            {/* --- 收件資訊區 --- */}
            <div className="col-md-8">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <label htmlFor="name" className="fs-32 fw-700 title-text-cart text-black mb-0 cursor-pointer">收件資訊</label>
                <span className="text-primary-600 fw-bold fs-14">請確實填寫，確保物資順利抵達</span>
              </div>

              <div className="row g-3 mx-0">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label small text-muted fw-bold">收件人姓名</label>
                  <input
                    id="name"
                    type="text"
                    className={`form-control bg-gray-100 border-0 py-10 ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="請輸入真實姓名"
                    {...register("name", { required: "請輸入姓名" })}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="tel" className="form-label small text-muted fw-bold">聯絡電話</label>
                  <input
                    id="tel"
                    type="tel"
                    className={`form-control bg-gray-100 border-0 py-10 ${errors.tel ? 'is-invalid' : ''}`}
                    placeholder="E.X. 0912345678"
                    {...register("tel", {
                      required: "請輸入電話",
                      pattern: { value: /^09\d{8}$/, message: "手機格式錯誤 (10碼數字)" }
                    })}
                  />
                  {errors.tel && <div className="invalid-feedback">{errors.tel.message}</div>}
                </div>

                <div className="col-md-12">
                  <label htmlFor="email" className="form-label small text-muted fw-bold">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    className={`form-control bg-gray-100 border-0 py-10 ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="接收訂單追蹤進度用"
                    {...register("email", {
                      required: "請輸入 Email",
                      pattern: { value: /^\S+@\S+$/i, message: "Email 格式不正確" }
                    })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                <div className="col-12 px-0">
                  <label htmlFor="address" className="form-label small text-muted fw-bold">
                    {watchDelivery === "宅配" ? "收件地址" : "取貨門市地址"}
                  </label>
                  <div className="input-group">
                    <input
                      id="address"
                      type="text"
                      className={`form-control bg-gray-100 border-0 py-10 ${errors.address ? 'is-invalid' : ''}`}
                      placeholder={watchDelivery === "宅配" ? "請輸入完整寄送地址" : "請點擊按鈕選擇取件門市"}
                      readOnly={watchDelivery !== "宅配"}
                      {...register("address", { required: "此欄位為必填" })}
                    />
                    {watchDelivery !== "宅配" && (
                      <button 
                        className="btn btn-primary px-4 fw-bold" 
                        type="button" 
                        onClick={() => toast.success('已為您定位：守護石虎旗艦店')}
                      >
                        選擇門市
                      </button>
                    )}
                  </div>
                  {errors.address && <div className="invalid-feedback d-block">{errors.address.message}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 發票與付款明細 --- */}
      <div className="container py-60">
        <div className="row g-5 mx-0 align-items-start">
          <div className="col-md-6 p-4 rounded-4 bg-white border border-2 shadow-sm">
            <div className="fs-28 fw-700 text-black mb-3 text-serif">發票設定</div>
            <div className="mb-3">
              <label htmlFor="invoiceType" className="form-label small text-muted fw-bold">發票類型</label>
              <select id="invoiceType" className="form-select bg-gray-50 border-0 py-10" {...register("invoiceType")}>
                <option value="二聯式">二聯式電子發票 (一般個人)</option>
                <option value="三聯式">三聯式電子發票 (公司/報帳用)</option>
                <option value="捐贈">捐贈發票 (支持生態保育協會)</option>
              </select>
            </div>
            
            {watchInvoiceType === "三聯式" && (
              <div className="mb-3">
                <label htmlFor="taxId" className="form-label small text-muted fw-bold">公司統一編號</label>
                <input id="taxId" type="text" className="form-control bg-gray-50 border-0 py-10" placeholder="請輸入 8 位數統編" {...register("taxId")} />
              </div>
            )}

            <div className="mb-0">
              <label htmlFor="invoiceTool" className="form-label small text-muted fw-bold">載具設定</label>
              <select id="invoiceTool" className="form-select bg-gray-50 border-0 py-10" {...register("invoiceTool")}>
                <option value="會員載具">會員載具 (系統自動對獎)</option>
                <option value="手機條碼">手機條碼</option>
                <option value="自然人憑證">自然人憑證</option>
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="fs-28 fw-700 text-black mb-3 text-serif ps-md-4">付款資訊細節</div>
            {watchPayment === "信用卡" ? (
              <div className="ms-md-4 p-4 border border-3 rounded-4 bg-white shadow-sm" style={{ borderColor: '#b68d4c' }}>
                <div className="mb-3 text-primary-600 fw-bold fs-14"><i className="bi bi-shield-check me-2"></i>SSL 安全加密支付</div>
                <input type="text" className="form-control mb-3 bg-gray-100 border-0" aria-label="卡號" placeholder="卡號 (0000 0000 0000 0000)" />
                <div className="row g-2 mx-0">
                  <div className="col-6"><input type="text" className="form-control bg-gray-100 border-0" aria-label="效期" placeholder="MM / YY" /></div>
                  <div className="col-6"><input type="text" className="form-control bg-gray-100 border-0" aria-label="CVV" placeholder="CVV" /></div>
                </div>
              </div>
            ) : (
              <div className="ms-md-4 p-5 border border-dashed rounded-4 text-center bg-gray-50 text-muted">
                <i className="bi bi-info-circle fs-2 mb-3 d-block text-primary"></i>
                您目前選擇「{watchPayment}」<br/>
                點擊確認後將引導至第三方支付頁面。
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- 備註區 --- */}
      <div className="py-60 bg-gray-50 mb-5">
        <div className="container">
          <label htmlFor="note" className="fs-32 fw-700 title-text-cart text-black mb-32 d-block cursor-pointer">備註與祈福留言</label>
          <textarea 
            id="note"
            className="form-control border-0 shadow-sm p-4" 
            rows="3" 
            placeholder="有什麼想對我們說的話，或對受助動物的祝福嗎？"
            {...register("note")}
            style={{ borderRadius: '20px' }}
          ></textarea>
        </div>
      </div>

      {/* --- 最後送出區 --- */}
      <div className="text-center py-60 pb-120">
        <div className="mb-48 d-flex justify-content-center align-items-center gap-3">
          <input 
            type="checkbox" 
            className="form-check-input mt-0 custom-checkbox" 
            id="terms" 
            {...register("terms", { required: true })} 
          />
          <label htmlFor="terms" className="form-check-label fs-18 fw-500 cursor-pointer">我已確認收件資訊無誤，並同意守護計畫條款</label>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-center gap-3 px-12">
          <NavLink to="/carts" className="btn btn-outline-primary px-60 py-16 rounded-pill fw-bold">
            返回調整清單
          </NavLink>
          <button 
            type="submit" 
            disabled={isSubmitting || !watch("terms")}
            className="btn btn-primary px-60 py-16 rounded-pill fw-bold border-0 shadow-lg transition-all"
          >
            {isSubmitting ? (
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
            ) : null}
            {isSubmitting ? "愛心傳送中..." : "確認結帳，送出守護力"}
          </button>
        </div>
      </div>

      <style>{`
        .cursor-pointer { cursor: pointer; }
        .py-12 { padding-top: 12px; padding-bottom: 12px; }
        .py-10 { padding-top: 10px; padding-bottom: 10px; }
        .mb-24 { margin-bottom: 24px; }
        .mb-48 { margin-bottom: 48px; }
        .rounded-5 { border-radius: 2rem; }
        .px-60 { padding-left: 60px; padding-right: 60px; }
        .custom-checkbox { width: 24px; height: 24px; cursor: pointer; border-radius: 6px; }
        .transition-all { transition: all 0.3s ease; }
        .btn-primary:disabled { background-color: #adb5bd; transform: none; }
        .btn-primary:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
      `}</style>
    </form>
  );
};

export default CheckoutForm;