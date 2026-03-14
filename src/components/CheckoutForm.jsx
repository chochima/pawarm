import React from 'react';
import { NavLink } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createAsyncGetCart } from "../slice/cartSlice";
import axios from 'axios';

// 假設這些環境變數與工具函數已定義
const { VITE_PATH, VITE_URL } = import.meta.env;

const CheckoutForm = ({ cart, getCart}) => {
  const dispatch = useDispatch();



  const {
    register,
    handleSubmit,
    reset,
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

  const onSubmit = async (data) => {
    try {
      if (!cart?.carts?.length) {
        alert("購物車沒有商品！");
        return;
      }

      // 整理 API 接受的格式
      // 將 user 基本欄位以外的資訊（付款、發票、備註）合併到 message
      const { name, email, tel, address, note, ...others } = data;
      
      const orderData = {
        data: {
          user: { name, email, tel, address },
          message: `
            備註: ${note || '無'}
            付款方式: ${others.payment}
            發票資訊: ${others.invoiceType} - ${others.invoiceTool} (${others.invoiceEmail || '未填'})
          `.trim()
        }
      };

      const res = await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/order`, orderData);
      
      if (res.data.success) {
        alert("訂單已送出！感謝您的愛心守護。");
        reset();   // 重置表單
        getCart(); // 刷新購物車
        dispatch(createAsyncGetCart());
      }
    } catch (err) {
      console.error(err);
      alert("訂單送出失敗，請檢查欄位。");
    }
  };

  return (
    <>
    
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* --- 運送與收件區 --- */}
        <div className="py-60 bg-gray-50 rounded-5">
            <div className="container">
                <div className="row">
          {/* 左：運送與付款 */}
          <div className="col-md-4">
            <div className="fs-36 fw-700 title-text-cart text-black mb-32">運送方式</div>
            <div className="mb-4">
              <label className="form-label small text-muted">送貨方式</label>
              <select className="form-select bg-gray-100 border-0 py-2" {...register("delivery")}>
                <option value="宅配">宅配</option>
              </select>
            </div>

            
            <div className="fs-36 fw-700 title-text-cart text-black mb-32">付款方式</div>
            <div className="mb-3">
              <select className="form-select bg-gray-100 border-0 py-2" {...register("payment")}>
                <option value="信用卡">信用卡 (Visa/MasterCard/JCB/銀聯)</option>
              </select>
            </div>
          </div>

          {/* 右：收件資訊 */}
          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="fs-36 fw-700 title-text-cart text-black mb-32">收件資訊</div>
              <button type="button" className="btn btn-link text-primary-600 fw-bold text-decoration-none p-0">儲存地址</button>
            </div>
            
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small text-muted">收件人姓名</label>
                <input 
                  type="text" 
                  className={`form-control bg-gray-100 border-0 ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="E.X. 王大明"
                  {...register("name", { required: "請輸入姓名" })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">聯絡電話</label>
                <input 
                  type="tel" 
                  className={`form-control bg-gray-100 border-0 ${errors.tel ? 'is-invalid' : ''}`}
                  placeholder="E.X. 09xxxxxxxx"
                  {...register("tel", { required: "請輸入電話", pattern: { value: /^09\d{8}$/, message: "請輸入正確手機格式" } })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">收件地址</label>
                <input type="text" className="form-control bg-gray-100 border-0" value="台灣" disabled />
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">E-mail</label>
               <input 
    type="email" 
    className={`form-control ${errors.email ? 'is-invalid' : ''}`} // 如果有錯，加上紅框
    placeholder="請輸入 Email"
    {...register("email", { 
      required: "請輸入 Email",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Email 格式不正確"
      }
    })} 
  />
  
  {/* 顯示錯誤文字 */}
  {errors.email && (
    <div className="invalid-feedback">
      {errors.email.message}
    </div>
  )}
              </div>
              <div className="col-12">
                <label className="form-label small text-muted">地址</label>
                <input 
                  type="text" 
                  className={`form-control bg-gray-100 border-0 ${errors.address ? 'is-invalid' : ''}`}
                  placeholder="請輸入地址與樓層戶號"
                  {...register("address", { required: "請輸入地址" })}
                />
              </div>
            </div>
          </div>
                </div>
            </div>
         
        </div>

        {/* --- 發票與卡片區 (波浪灰色背景區) --- */}
        <div className="container">
            <div className=" row py-60 ">
          <div className="row g-5">
            <div className="col-md-6">
              <div className="fs-36 fw-700 title-text-cart text-black mb-32">發票</div>
              <div className="mb-3">
                <label className="form-label small text-muted">發票類型</label>
                <select className="form-select bg-gray-50 border-0 py-2" {...register("invoiceType")}>
                  <option value="二聯式">二聯式</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label small text-muted">發票載具</label>
                <select className="form-select bg-gray-50 border-0 py-2" {...register("invoiceTool")}>
                  <option value="電子發票載具">電子發票載具</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label small text-muted">電子發票載具</label>
                <input type="email" className="form-control bg-gray-50 border-0 py-2" placeholder="請輸入Email" {...register("invoiceEmail")} />
              </div>
            </div>

            <div className="col-md-6 d-flex align-items-center">
              <div className="p-4 border border-2 rounded-4 w-100 bg-white shadow-sm" style={{ borderColor: '#b68d4c' }}>
                <p className="fw-bold mb-3" style={{ color: '#b68d4c' }}>信用卡資訊</p>
                <input type="text" className="form-control mb-3 bg-gray-50 border-0" placeholder="卡號 (0000 0000 0000 0000)" />
                <input type="text" className="form-control mb-3 bg-gray-50 border-0" placeholder="持卡人姓名" />
                <div className="row g-2">
                  <div className="col-6"><input type="text" className="form-control bg-gray-50 border-0" placeholder="MM/YY" /></div>
                  <div className="col-6"><input type="text" className="form-control bg-gray-50 border-0" placeholder="CVV" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        

        {/* --- 備註與送出 --- */}
        <div className="py-60 bg-gray-50 ">
            <div className="container">
            <div className="row">
            <div className="fs-36 fw-700 title-text-cart text-black mb-32">備註</div>
          <textarea 
            className="form-control border-0 shadow-sm p-3" 
            rows="5" 
            placeholder="有什麼想備註的嗎？"
            {...register("note")}
            style={{ borderRadius: '15px' }}
          ></textarea>
            </div>
        </div>
          
        </div>

        <div className="text-center py-60">
          <div className="mb-4 d-flex justify-content-center align-items-center gap-2">
            <input type="checkbox" className="form-check-input mt-0" id="terms" {...register("terms", { required: true })} />
            <label htmlFor="terms" className="form-check-label fs-14">
              我接受<span className="text-primary fw-bold mx-1">服務條款</span>和<span className="text-primary fw-bold mx-1">隱私權政策</span>
            </label>
          </div>
          <div className="d-flex justify-content-center gap-3">
            <NavLink to="/carts"   className="btn-outline btn btn-outline-primary text-primary fw-bold px-36 py-12 fs-14  fs-md-18 px-md-44 py-md-16">返回上一步</NavLink>
            <button 
              type="submit" 
              className="btn-filled bg-primary-500 text-white fw-bold px-36 py-12 fs-14  fs-md-18 px-md-44 py-md-16 border-0" 
            >
              送出愛心
            </button>
          </div>
        </div>
      </form>
    
    </>
    
  );
};

export default CheckoutForm;