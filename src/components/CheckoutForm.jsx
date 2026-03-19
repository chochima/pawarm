import React from 'react';
import { NavLink } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react"; 
import toast from 'react-hot-toast'; 
import { createAsyncGetCart } from "../slice/cartSlice";
import axios from 'axios';

const { VITE_PATH, VITE_URL } = import.meta.env;

const CheckoutForm = ({ cart, getCart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch, // 監聽表單數值
    formState: { errors },
  } = useForm({
    defaultValues: {
      delivery: "宅配",
      payment: "信用卡",
      invoiceType: "二聯式",
      invoiceTool: "電子發票載具",
    },
    mode: "onTouched"
  });

  // 監聽狀態變化
  const watchDelivery = watch("delivery");
  const watchPayment = watch("payment");
  const watchInvoiceType = watch("invoiceType");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (!cart?.carts?.length) {
        toast.error("購物車沒有商品！");
        return;
      }

      const { 
        name, email, tel, address, note, 
        delivery, payment, invoiceType, invoiceTool, invoiceEmail 
      } = data;

      // 保持原本 orderData 結構別動
      const orderData = {
        data: {
          user: { 
            name, email, tel, address, delivery, payment,
            invoice: { type: invoiceType, tool: invoiceTool, email: invoiceEmail }
          },
          message: note || '無'
        }
      };

      const res = await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/order`, orderData);
      
      if (res.data.success) {
        const { orderId } = res.data;
        toast.success("訂單已送出！感謝您的愛心。");
        reset();   
        getCart(); 
        dispatch(createAsyncGetCart());
        navigate(`/checkout-success/${orderId}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("訂單送出失敗，請檢查欄位。");
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* --- 運送與收件區 --- */}
      <div className="py-60 bg-gray-50 rounded-5 mb-5">
        <div className="container">
          <div className="row">
            {/* 左：方式選擇 */}
            <div className="col-md-4 d-flex flex-column gap-5">
              <div>
                <div className="fs-36 fw-700 title-text-cart text-black mb-32">運送方式</div>
                <div className="mb-4">
                  <label className="form-label small text-muted">送貨方式</label>
                  <select className="form-select bg-gray-100 border-0 py-2" {...register("delivery")}>
                    <option value="宅配">宅配 (黑貓/新竹物流)</option>
                    <option value="7-11">7-11 超商取貨</option>
                    <option value="FamilyMart">全家超商取貨</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="fs-36 fw-700 title-text-cart text-black mb-32">付款方式</div>
                <div className="mb-3">
                  <select className="form-select bg-gray-100 border-0 py-2" {...register("payment")}>
                    <option value="信用卡">信用卡 (Visa/MasterCard/JCB)</option>
                    <option value="LINEPay">LINE Pay</option>
                    <option value="ATM">ATM 虛擬帳號轉帳</option>
                    <option value="COD">貨到付款</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 右：收件資訊 */}
            <div className="col-md-8">
  <div className="d-flex justify-content-between align-items-center mb-4">
    <div className="fs-36 fw-700 title-text-cart text-black mb-32">收件資訊</div>
    <button type="button" className="btn btn-link text-primary-600 fw-bold text-decoration-none p-0">儲存地址</button>
  </div>

  <div className="row g-3">
    {/* 姓名 */}
    <div className="col-md-6">
      <label className="form-label small text-muted">收件人姓名</label>
      <input
        type="text"
        className={`form-control bg-gray-100 border-0 ${errors.name ? 'is-invalid' : ''}`}
        placeholder="E.X. 王大明"
        {...register("name", { required: "請輸入姓名" })}
      />
      {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
    </div>

    {/* 電話 */}
    <div className="col-md-6">
      <label className="form-label small text-muted">聯絡電話</label>
      <input
        type="tel"
        className={`form-control bg-gray-100 border-0 ${errors.tel ? 'is-invalid' : ''}`}
        placeholder="09xxxxxxxx"
        {...register("tel", {
          required: "請輸入電話",
          pattern: { value: /^09\d{8}$/, message: "手機格式錯誤" }
        })}
      />
      {errors.tel && <div className="invalid-feedback">{errors.tel.message}</div>}
    </div>

    {/* 國家 (固定欄位) */}
    <div className="col-md-6">
      <label className="form-label small text-muted">收件地區</label>
      <input type="text" className="form-control bg-gray-100 border-0" value="台灣" disabled />
    </div>

    {/* E-mail */}
    <div className="col-md-6">
      <label className="form-label small text-muted">E-mail</label>
      <input
        type="email"
        className={`form-control bg-gray-100 border-0 ${errors.email ? 'is-invalid' : ''}`}
        placeholder="請輸入 Email"
        {...register("email", {
          required: "請輸入 Email",
          pattern: { value: /^\S+@\S+$/i, message: "Email 格式錯誤" }
        })}
      />
      {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
    </div>

    {/* 動態切換：地址 vs 超商門市 */}
    {watchDelivery === "宅配" ? (
      <div className="col-12">
        <label className="form-label small text-muted">收件地址</label>
        <input
          type="text"
          className={`form-control bg-gray-100 border-0 ${errors.address ? 'is-invalid' : ''}`}
          placeholder="請輸入地址與樓層戶號"
          {...register("address", { required: "請輸入地址" })}
        />
        {errors.address && <div className="invalid-feedback d-block">{errors.address.message}</div>}
      </div>
    ) : (
      <div className="col-12">
        <label className="form-label small text-muted">取貨門市</label>
        <div className="input-group">
          {/* 這裡是重點：超商模式下，我們一樣把門市名稱 register 到 address 欄位 */}
          <input
            type="text"
            className={`form-control bg-gray-100 border-0 ${errors.address ? 'is-invalid' : ''}`}
            placeholder="請點擊右側按鈕選擇門市"
            readOnly
            {...register("address", { required: "請選擇門市" })}
          />
          <button 
            className="btn btn-primary px-4" 
            type="button" 
            onClick={() => {
              // 這裡模擬選擇門市後，手動寫入值到 address
              toast.success('已選擇模擬門市：守護保育門市');
              // 如果你想讓 RHF 感應到值，需從 useForm 解構出 setValue
              // setValue("address", "某某超商 - 守護保育門市 (123456)");
            }}
          >
            選擇門市
          </button>
        </div>
        {errors.address && <div className="invalid-feedback d-block">{errors.address.message}</div>}
      </div>
    )}
  </div>
</div>
          </div>
        </div>
      </div>

      {/* --- 發票與付款詳細區 --- */}
      <div className="container py-60">
        <div className="row g-5">
          <div className="col-md-6">
            <div className="fs-36 fw-700 title-text-cart text-black mb-32">發票設定</div>
            <div className="mb-3">
              <label className="form-label small text-muted">發票類型</label>
              <select className="form-select bg-gray-50 border-0 py-2" {...register("invoiceType")}>
                <option value="二聯式">二聯式電子發票</option>
                <option value="三聯式">三聯式電子發票 (需統編)</option>
                <option value="捐贈">捐贈發票</option>
              </select>
            </div>
            
            {watchInvoiceType === "三聯式" && (
              <div className="mb-3">
                <label className="form-label small text-muted">統一編號</label>
                <input type="text" className="form-control bg-gray-50 border-0 py-2" placeholder="請輸入 8 位數統編" />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label small text-muted">載具/工具</label>
              <select className="form-select bg-gray-50 border-0 py-2" {...register("invoiceTool")}>
                <option value="手機條碼">手機條碼</option>
                <option value="會員載具">會員載具</option>
                <option value="愛心碼">愛心碼 (捐贈用)</option>
              </select>
            </div>
          </div>

          <div className="col-md-6 d-flex flex-column">
            <div className="fs-36 fw-700 title-text-cart text-black mb-32">付款資訊</div>
            
            {/* 根據付款方式切換 UI */}
            {watchPayment === "信用卡" ? (
              <div className="p-4 border border-3 rounded-4 w-100 bg-white shadow-sm" style={{ borderColor: '#b68d4c' }}>
                <div className="mb-3 text-primary-600 fw-bold fs-14">信用卡安全加密支付</div>
                <input type="text" className="form-control mb-3 bg-gray-50 border-0" placeholder="卡號 (0000 0000 0000 0000)" />
                <input type="text" className="form-control mb-3 bg-gray-50 border-0" placeholder="持卡人姓名" />
                <div className="row g-2">
                  <div className="col-6"><input type="text" className="form-control bg-gray-50 border-0" placeholder="MM/YY" /></div>
                  <div className="col-6"><input type="text" className="form-control bg-gray-50 border-0" placeholder="CVV" /></div>
                </div>
              </div>
            ) : (
              <div className="p-5 border border-dashed rounded-4 text-center bg-white text-muted">
                <i className="bi bi-wallet2 fs-1 mb-2 d-block"></i>
                您選擇的是「{watchPayment}」<br/>
                請在送出訂單後，依頁面跳轉指示完成操作。
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- 備註區 --- */}
      <div className="py-60 bg-gray-50 mb-5">
        <div className="container">
          <div className="fs-36 fw-700 title-text-cart text-black mb-32">備註</div>
          <textarea 
            className="form-control border-0 shadow-sm p-3" 
            rows="4" 
            placeholder="有什麼想告訴保育機構的話嗎？"
            {...register("note")}
            style={{ borderRadius: '15px' }}
          ></textarea>
        </div>
      </div>

      {/* --- 送出按鈕 --- */}
      <div className="text-center py-60">
        <div className="mb-4 d-flex justify-content-center align-items-center gap-2">
          <input type="checkbox" className="form-check-input mt-0" id="terms" {...register("terms", { required: true })} />
          <label htmlFor="terms" className="form-check-label fs-18">我接受服務條款和隱私權政策</label>
        </div>
        <div className="d-flex justify-content-center gap-3">
          <NavLink to="/carts" className="btn btn-outline-primary px-44 py-16 fw-bold">返回上一步</NavLink>
          <button 
            type="submit" 
            disabled={isSubmitting || !watch("terms")}
            className="btn btn-primary px-44 py-16 fw-bold border-0 shadow-sm"
          >
            {isSubmitting ? "訂單處理中..." : "確認送出愛心"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;