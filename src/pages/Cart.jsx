import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { createAsyncGetCart } from "../slice/cartSlice";
import toast from 'react-hot-toast';
import  axios from 'axios'
import love from '../image/love.svg'
import loveFill from '../image/love-fill.svg'
import { useSelector } from "react-redux";

import { currency} from"../utils/filter";
import CheckoutStepper from "../components/Stepper";
import ProductRecommendation from "../components/ProductRecommendation";
import { NavLink } from "react-router";




// 1. 引入 Swiper React 組件
import { Swiper, SwiperSlide } from 'swiper/react';

// 2. 引入 Swiper 核心樣式
import 'swiper/css';
import 'swiper/css/pagination'; // 如果你有用到 pagination 分頁點
import 'swiper/css/navigation'; // 如果你有用到左右箭頭

// 3. (選配) 引入你要的功能模組

import { Pagination, Autoplay } from 'swiper/modules';

const{VITE_PATH,VITE_URL}=import.meta.env;


const mechanismImages = [
  {
    name: '台北市立動物園',
    imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771161922826.png"
  },
  {
    name: 'WildOne 野灣',
    imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771162111383.png"
  },
  {
    name: '保育機構_03.png',
    imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771163906842.png"
  },
  {
    name: '保育機構_04.png',
    imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771163947004.png"
  },
  {
    name: '保育機構_05.png',
    imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771164038605.png"
  },
  {
    name: '保育機構_06.png',
    imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771164084617.png"
  },
  {
    name: '保育機構_07.png',
    imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771164103587.png"
  },
  {
    name: '保育機構_08.png',
    imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771164129948.png"
  }

];

const Carts=()=>{
  const [isAdding, setIsAdding] = useState(false);
  const [cart, setCart] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [randomProducts, setRandomProducts] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [favorites, setFavorites] = useState(() => {
  return JSON.parse(localStorage.getItem('fav')) || [];
});

  const { token } = useSelector((state) => state.auth);
  const isLogin = !!token;


  const dispatch = useDispatch();
  

  
 


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
  let updatedFavs;
  
  if (favorites.includes(id)) {
    // 取消收藏
    updatedFavs = favorites.filter((favId) => favId !== id);
    toast('已從收藏清單移除', { icon: '🗑️' });
  } else {
    // 新增收藏
    updatedFavs = [...favorites, id];
    toast.success('已加入關注清單！', { icon: '❤️' });
  }

  // 同步更新 State 與 LocalStorage
  setFavorites(updatedFavs);
  localStorage.setItem('fav', JSON.stringify(updatedFavs));
};


  //購物車
  const getCart = async () => {
    try {
      const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/cart`);
      setCart(res.data.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const addCart = async (id, qty = 1) => {
  const data = {
    product_id: id,
    qty,
  };

  toast.promise(
    axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/cart`, { data }),
    {
      loading: '正在加入守護清單...',
      success: (res) => {
        dispatch(createAsyncGetCart());
        if (typeof getCart === 'function') getCart(); 
        return "已成功加入守護清單！";
      },
      error: (err) => {
        console.error("加入購物車失敗", err);
        return "加入失敗，請稍後再試";
      },
    },
    {
      
      style: {
        minWidth: '250px',
        fontWeight: 'bold',
      },
      success: {
        duration: 3000,
        icon: '🐾', // 配合寵物主題的圖示
      },
    }
  );
};
  const handleAdd = async (id) => {
  setIsAdding(true);
  await addCart(id); 
  setIsAdding(false);
  };
 const deleteCart = async (id) => {
  const toastId = toast.loading('處理中...'); 
  try {
    await axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${id}`);
    
    // 更新資料
    dispatch(createAsyncGetCart());
    getCart();

    // 將原本的 loading toast 改為成功
    toast.success('已將商品移除', { id: toastId });
  } catch (err) {
    console.log(err.response?.data);
    
    // 將原本的 loading toast 改為錯誤
    toast.error('移除失敗', { id: toastId });
  }
};
const updateCart = async (cartId, productId, qty = 1) => {
  const data = {
    product_id: productId,
    qty,
  };

  // 使用 toast.promise 並自定義樣式
  toast.promise(
    axios.put(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${cartId}`, { data }),
    {
      loading: '正在更新數量...',
      success: () => {
        dispatch(createAsyncGetCart());
        if (getCart) getCart();
        return '數量已更新！';
      },
      error: (err) => {
        console.error(err.response?.data);
        return '更新失敗，請稍後再試';
      },
    },
    {
      id: `update-${cartId}`, // 使用固定的 ID，防止使用者連點時彈出多個 toast
      style: { minWidth: '200px' },
    }
  );
};

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
const handleMoveToWishlist = (item) => {
  const moveAction = async () => {
    // 1. 取得舊資料
    const currentFavs = JSON.parse(localStorage.getItem('fav')) || [];
    
    // 2. 判斷並存入 LocalStorage
    // 注意：確認 item.product_id 是否正確（部分 API 結構是 item.product.id）
    const productId = item.product_id; 

    if (!currentFavs.includes(productId)) {
      const updated = [...currentFavs, productId];
      localStorage.setItem('fav', JSON.stringify(updated));

      // ⭐ 核心關鍵：手動發送事件通知其他元件更新 State
      window.dispatchEvent(new Event("storage")); 
    }
    
    // 3. 呼叫刪除購物車 API
    return axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${item.id}`);
  };

  toast.promise(moveAction(), {
    loading: '正在搬移商品...',
    success: () => {
      // 成功後重新整理購物車列表
      dispatch(createAsyncGetCart());
      if (typeof getCart === 'function') getCart();
      return '已移至收藏清單！';
    },
    error: '搬移失敗',
  });
};


  
  useEffect(() => {
    getCart();
    getSixRandomProducts();
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
    <div className="col-lg-3">
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
         
        {isLogin ? (
    // 已登入：正常的 NavLink
    <NavLink 
      to="/checkout"  
      className="btn-filled bg-primary-500 text-white fw-bold fs-18 px-44 py-16 text-center text-decoration-none shadow-sm transition-all"
    >
      下一步
    </NavLink>
  ) : (
    // 未登入：外觀為灰色按鈕，點擊提示並導向登入
    <button 
      onClick={() => {
        toast.error('守護生命前，請先登入會員', { icon: '👤' });
        // 選配：兩秒後導向登入頁
        // setTimeout(() => navigate('/login'), 2000);
      }}
      className="btn-filled bg-gray-400 text-white fw-bold fs-18 px-44 py-16 text-center border-0 cursor-not-allowed"
    >
      請先登入會員
    </button>
  )}
  <div className="fs-14 lh-base text-gray-500">✨ 本次消費將贊助 ${currency(cart?.final_total*0.15)} 給保育機構，感謝您的購買</div>
      </div>
    </div>
  </div>
  
</div>
<div className="bg-gray-50">
  <div className="container  overflow-hidden">
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
  <div className=" py-120 overflow-x-hidden">
     <div className="fs-36 fw-700 title-text-cart text-black mb-32">瀏覽更多保育機構</div>
     <div className="row">
      <div className="col-lg-9 col-12">
        <div className="row g-20 g-md-32 align-items-center">
          {(mechanismImages || []).map((item, index) => (
  <div className="col-6 col-lg-3" key={index}>
    <NavLink className="logo-wrapper d-flex justify-content-center align-items-center">
      <img 
        src={item.imageUrl} 
        alt={item.name}
        className="img-fluid partner-logo" 
        style={{ maxHeight: '80px', width: 'auto', objectFit: 'contain' }}
      />
    </NavLink>
  </div>
))}
      </div>
      </div>
      <div className="d-none d-lg-block">
        </div>
     </div>
  </div>
</div>
</div>


    </>
    


  )
}

export default Carts;