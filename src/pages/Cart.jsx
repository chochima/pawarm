import { useState, useEffect, useRef } from "react";
import  axios from 'axios'
import love from '../image/love.svg'
import loveFill from '../image/love-fill.svg'


import { currency} from"../utils/filter";
import CheckoutStepper from "../components/Stepper";
import { NavLink } from "react-router";

import 台北市立動物園 from '../image/state=hover, type=taipei zoo.png';


// 1. 引入 Swiper React 組件
import { Swiper, SwiperSlide } from 'swiper/react';

// 2. 引入 Swiper 核心樣式（沒引的話會排版崩潰）
import 'swiper/css';
import 'swiper/css/pagination'; // 如果你有用到 pagination 分頁點
import 'swiper/css/navigation'; // 如果你有用到左右箭頭

// 3. (選配) 引入你要的功能模組
import { Pagination, Autoplay } from 'swiper/modules';

const{VITE_PATH,VITE_URL}=import.meta.env;

const Carts=()=>{
  const [isAdding, setIsAdding] = useState(false);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [randomProducts, setRandomProducts] = useState([]);
 


  const getSixRandomProducts = async () => {
  try {
    const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`);
    const allData = res.data.products;

    // 隨機打亂並取出前 6 個
    const shuffled = [...allData]
      .sort(() => 0.5 - Math.random()) // 利用 0.5 產生正負機率來打亂
      .slice(0, 6); // 切取前 6 筆

    setRandomProducts(shuffled);
  } catch (err) {
    console.error("抓取隨機資料失敗", err);
  }
};

const toggleFavorite = (id) => {
  if (favorites.includes(id)) {
    // 如果已經在清單裡，就濾掉它 (取消收藏)
    setFavorites(favorites.filter((favId) => favId !== id));
  } else {
    // 如果不在清單裡，就加進去 (新增收藏)
    setFavorites([...favorites, id]);
  }
};


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
  const addCart= async(id, qty = 1)=>{
    try{
        const data={
            product_id: id,
            qty,
        }
        await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/cart`,{data});
        getCart();
        alert("已成功加入守護清單！");


    }catch(err){
        console.log("加入購物車失敗")
    }
   }
   const handleAdd = async (id) => {
  setIsAdding(true);
  await addCart(id); // 呼叫你原本的 addCart
  setIsAdding(false);
};

 
  const deleteCart = async (id) => {
    try {
      await axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${id}`);
      getCart();
    } catch (err) {
      console.log(err.response.data);
    }
  };

 
  const updateCart = async (cartId, productId, qty = 1) => {
    try {

      const data = {
        product_id: productId,
        qty,
      };
      await axios.put(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${cartId}`, { data });
      getCart();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const onSubmit = async (data) => {
      try {
        if(!cart.carts.length) {
          alert("購物車沒有商品！");
          return;
        }
        await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/order`, { data: { user: data, message: data.message } });
        reset();
        getCart();
      } catch (err) {
        console.err(err);
      }
  };



  
  useEffect(() => {
    getCart();
    getSixRandomProducts();
  }, []);

  return (
    <>
    <div className="container my-5">
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
            <th width="150"></th>
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
  <button 
    className="btn btn-outline-dark btn-sm rounded-circle"
    style={{ width: '30px', height: '30px', padding: 0 }}
    onClick={() => updateCart(item.id, item.product_id, item.qty - 1)}
    disabled={item.qty <= 1 || isUpdating === item.id}
  >
    <i className="bi bi-dash"></i>
  </button>
  
  <span className="mx-3 fw-bold">{item.qty}</span>
  
  <button 
    className="btn btn-outline-dark btn-sm rounded-circle"
    style={{ width: '30px', height: '30px', padding: 0 }}
    onClick={() => updateCart(item.id, item.product_id, item.qty + 1)}
    disabled={isUpdating === item.id}
  >
    <i className="bi bi-plus"></i>
  </button>
</div>
              </td>

              <td className="text-start fw-bold">
                ${currency(item.final_total)}
              </td>

              <td >
  <button 
    className="btn btn-sm text-dark d-flex align-items-center justify-content-end mb-2 w-100"
    onClick={() => deleteCart(item.id)}
  >
    <i className="bi bi-trash3 me-2"></i> 取消守護
  </button>
  <button 
    className="btn btn-sm text-dark d-flex align-items-center justify-content-end w-100"
    onClick={() => handleMoveToWishlist(item)}
  >
    <i className="bi bi-heart me-2"></i> 移至收藏
  </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
     </div>
     {/* 手機版*/}
     <div className="d-md-none">
  {cart.carts.map((item) => (
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
            {/* 愛心與垃圾桶按鈕 */}
            <div className="d-flex gap-3 text-muted">
              <i className="bi bi-heart" style={{ cursor: 'pointer' }}></i>
              <i 
                className="bi bi-trash" 
                style={{ cursor: 'pointer' }}
                onClick={() => deleteCart(item.id)}
              ></i>
            </div>
          </div>

          {/* 下方：數量控制與金額 */}
          <div className="d-flex justify-content-between align-items-center mt-3">
             <div className="d-flex align-items-center justify-content-center">
  <button 
    className="btn btn-outline-dark btn-sm rounded-circle"
    style={{ width: '30px', height: '30px', padding: 0 }}
    onClick={() => updateCart(item.id, item.product_id, item.qty - 1)}
    disabled={item.qty <= 1 || isUpdating === item.id}
  >
    <i className="bi bi-dash"></i>
  </button>
  
  <span className="mx-3 fw-bold">{item.qty}</span>
  
  <button 
    className="btn btn-outline-dark btn-sm rounded-circle"
    style={{ width: '30px', height: '30px', padding: 0 }}
    onClick={() => updateCart(item.id, item.product_id, item.qty + 1)}
    disabled={isUpdating === item.id}
  >
    <i className="bi bi-plus"></i>
  </button>
</div>
            <span className="fw-bold">${item.total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  ))}
    </div>

    </div>
    <div className="col-md-3">
      <div className="fs-36 fw-700 title-text-cart text-black mb-32">守護計畫</div>
      <div className="bg-gray-50 p-20 d-flex flex-column gap-20">
        <div className="d-flex  justify-content-between">
          <div className="fs-18 lh-base fw-500 text-gray-900">商品總額</div>
          <div className="fs-20 lh-base fw-500 text-gray-900">${currency(cart?.final_total)}</div>
        </div>
        <div className="d-flex  justify-content-between">
          <div className="fs-18 lh-base fw-500 text-gray-900">守護回饋碼</div>
          <div className="fs-20 lh-base fw-500 text-gray-900">-$150</div>
        </div>
        
        <div className="mb-4">
          <hr />
    <small className="text-muted d-block mb-2">輸入守護回饋碼</small>
    <div className="d-flex justify-content-between align-items-center bg-white p-2 border rounded">
      <span className="text-muted small">第一次的守護計劃</span>
      <i className="bi bi-trash text-muted"></i>
    </div>
    <hr />
  </div>


  <div className="d-flex justify-content-between align-items-center mb-4">
    <div>
      <div className="fs-18 fw-bold text-gray-900">守護計畫總額</div>
      <div className="fs-14 text-gray-900">(不含運費)</div>
    </div>
    
    <div className="fw-bold mb-0 fs-28" style={{ color: '#b68d4c' }}>${currency(cart?.final_total)}</div>
  </div>
         
        <a className="btn-filled bg-primary-500 text-white fw-bold fs-18 px-44 py-16  text-center text-decoration-none">下一步</a>
  <div className="fs-14 lh-base text-gray-500">✨ 本次消費將贊助 ${currency(cart?.final_total*0.15)} 給保育機構，感謝您的購買</div>
      </div>
    </div>
  </div>
  
</div>
<div className="bg-gray-50">
  <div className="container ">
  <div className=" py-120">
     <div className="fs-36 fw-700 title-text-cart text-black mb-32">與牠們相遇：「下一位等著您守護的夥伴」</div>
     <div className="row">
      <div className="col-lg-9 col-12">
        {/* 手機版 Swiper 容器 */}
    <div className="d-md-none">
      <Swiper 
     modules={[Pagination]}
     spaceBetween={16}
     slidesPerView={1.2} // 關鍵：露出一點點下一張卡片
     pagination={{ clickable: true }}
     className="my-5 pb-5 custom-swiper"
      >
        {randomProducts.map(product => (
          <SwiperSlide key={product.id}>
             <div className="card border-0 shadow-sm">
                <div className="custom-card">
                        <div className="card product-card custom-card-bg" >
              {/* 圖片區 */}
              <div className="position-relative ">
                {/* 標籤 */}
                <div className="position-absolute top-0 start-0 m-2 d-flex gap-2">
                  <span className="bg-primary-200 border border-primary-300 fs-14 px-12 py-4 newItem  badge rounded-pill fw-bold mt-3 ms-3 " >新品</span>
                  <span className="bg-primary-100 border border-primary-300 fs-14 px-12 py-4 newItem  badge rounded-pill fw-bold mt-3" >台灣專屬</span>
                </div>
        
                {/* 愛心 */}
                <button
                  type="button"
                  className="position-absolute top-0 end-0 m-3 bg-transparent border-0"
                  onClick={() => toggleFavorite(product.id)}
                >
                  {favorites.includes(product.id) ? <img src={loveFill} alt="lovefill" />:<img src={love} alt="love" /> }
                </button>
               
        
                <img
                  src={product.imageUrl}
                  className="img-fluid shadow-sm"
                  alt={product.imageUrl}
                />
              </div>
        
              {/* 內容 */}
              <div className="card-body">
                <h6 className="fw-bold mb-1 fs-24 text-gray-900">{product.title}</h6>
                <p className="fw-bold mb-16 fs-14 text-gray-500 ">{product.agency}</p>
        
                <div className="mb-3">
                  <span className="fw-bold fs-24">${product.origin_price}</span>
                  <del className="text-muted fw-normal ms-2 fs-20">${product.price}</del>
                </div>
        
                <button className="btn btn-outline-primary-500 w-100 fs-18 py-16 fw-bold" onClick={() => 
                handleAdd(product.id)}
                disabled={isAdding}>
                 {isAdding ? (<span className="spinner-border spinner-border-sm" role="status"></span>) : '加入購物車'}
                </button>
              </div>
                         </div>
                      </div>
             </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
        {/* 桌機版 Grid 容器 */}
        <div className="d-none d-md-block">
          <div className="row g-24">
          {
                  randomProducts.map((product)=>{
                     return(
                      <div className="col-4 g-12 custom-card" key={product.id}>
                        <div className="card product-card custom-card-bg" style={{ maxWidth: 320 }}>
              {/* 圖片區 */}
              <div className="position-relative ">
                {/* 標籤 */}
                <div className="position-absolute top-0 start-0 m-2 d-flex gap-2">
                  <span className="bg-primary-200 border border-primary-300 fs-14 px-12 py-4 newItem  badge rounded-pill fw-bold mt-3 ms-3 " >新品</span>
                  <span className="bg-primary-100 border border-primary-300 fs-14 px-12 py-4 newItem  badge rounded-pill fw-bold mt-3" >台灣專屬</span>
                </div>
        
                {/* 愛心 */}
                <button
                  type="button"
                  className="position-absolute top-0 end-0 m-3 bg-transparent border-0"
                  onClick={() => toggleFavorite(product.id)}
                >
                  {favorites.includes(product.id) ? <img src={loveFill} alt="lovefill" />:<img src={love} alt="love" /> }
                </button>
               
        
                <img
                  src={product.imageUrl}
                  className="img-fluid shadow-sm"
                  alt={product.imageUrl}
                />
              </div>
        
              {/* 內容 */}
              <div className="card-body">
                <h6 className="fw-bold mb-1 fs-24 text-gray-900">{product.title}</h6>
                <p className="fw-bold mb-16 fs-14 text-gray-500 ">{product.agency}</p>
        
                <div className="mb-3">
                  <span className="fw-bold fs-24">${product.origin_price}</span>
                  <del className="text-muted fw-normal ms-2 fs-20">${product.price}</del>
                </div>
        
                <button className="btn btn-outline-primary-500 w-100 fs-18 py-16 fw-bold" onClick={() => 
                handleAdd(product.id)}
                disabled={isAdding}>
                 {isAdding ? (<span className="spinner-border spinner-border-sm" role="status"></span>) : '加入購物車'}
                </button>
              </div>
                         </div>
                      </div>
                     )
                  })
                }
        </div>
        </div>
        
      </div>
      
     </div>
  </div>
</div>
</div>
<div >
  <div className="container ">
  <div className=" py-120">
     <div className="fs-36 fw-700 title-text-cart text-black mb-32">瀏覽更多保育機構</div>
     <div className="row">
      <div className="col-lg-9 col-12">
        <div className="row g-20 g-md-32 align-items-center">
          <div className="col-6 col-md-3">
              <NavLink className="logo-wrapper">
                <img 
                  src={台北市立動物園 }
                  alt="台北市立動物園" 
                  className="img-fluid partner-logo" 
                />
              </NavLink>
            </div>
            <div className="col-6 col-md-3">
              <NavLink className="logo-wrapper">
                <img 
                  src={台北市立動物園 }
                  alt="台北市立動物園" 
                  className="img-fluid partner-logo" 
                />
              </NavLink>
            </div>
            <div className="col-6 col-md-3">
              <NavLink className="logo-wrapper">
                <img 
                  src={台北市立動物園 }
                  alt="台北市立動物園" 
                  className="img-fluid partner-logo" 
                />
              </NavLink>
            </div>
            <div className="col-6 col-md-3">
              <NavLink className="logo-wrapper">
                <img 
                  src={台北市立動物園 }
                  alt="台北市立動物園" 
                  className="img-fluid partner-logo" 
                />
              </NavLink>
            </div>
            <div className="col-6 col-md-3">
              <NavLink className="logo-wrapper">
                <img 
                  src={台北市立動物園 }
                  alt="台北市立動物園" 
                  className="img-fluid partner-logo" 
                />
              </NavLink>
            </div>
            <div className="col-6 col-md-3">
              <NavLink className="logo-wrapper">
                <img 
                  src={台北市立動物園 }
                  alt="台北市立動物園" 
                  className="img-fluid partner-logo" 
                />
              </NavLink>
            </div>
            <div className="col-6 col-md-3">
              <NavLink className="logo-wrapper">
                <img 
                  src={台北市立動物園 }
                  alt="台北市立動物園" 
                  className="img-fluid partner-logo" 
                />
              </NavLink>
            </div>
            <div className="col-6 col-md-3">
              <NavLink className="logo-wrapper">
                <img 
                  src={台北市立動物園 }
                  alt="台北市立動物園" 
                  className="img-fluid partner-logo" 
                />
              </NavLink>
            </div>
      </div>
      </div>
      <div className="col-3 d-none d-lg-block">
        </div>
     </div>
  </div>
</div>
</div>


    </>
    


  )
}

export default Carts;