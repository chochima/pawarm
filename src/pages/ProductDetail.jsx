import { useEffect, useState } from "react";
import { useParams } from "react-router"; 
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createAsyncGetCart } from "../slice/cartSlice";
import { NavLink } from "react-router";
import toast from 'react-hot-toast';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const { VITE_PATH, VITE_URL } = import.meta.env;


const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainImage, setMainImage] = useState(""); 
  const [data, setData] = useState({ summary: { averageRating: 0, totalReviews: 0 }, reviews: [] });
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // 取得單一產品資料
  const getProduct = async () => {
    try {
      const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/product/${id}`);
      setProduct(res.data.product);
      setMainImage(res.data.product.imageUrl); 
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch('https://pawarm-api.onrender.com/api/reviews')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error("抓取失敗:", err));
    getProduct();
  }, [id]);

  const allImages = [product.imageUrl, ...(product.imagesUrl || [])].filter(Boolean);

  // 加入購物車
  const addToCart = async () => {
    try {
      const data = { product_id: id, qty };
      await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/cart`, { data });
      dispatch(createAsyncGetCart()); // 更新 Navbar 數量
      toast.success('已加入守護清單！', {
    duration: 3000, // 持續 3 秒
    position: 'top-right', // 顯示在右上角
    style: {
      background: '#333',
      color: '#fff',
    },
  });
    } catch (err) {
      alert("加入失敗");
    }
  };
  const handleBuyNow = async()=>{
    await addToCart();
    toast.success('已加入守護清單，準備前往結帳！')
    navigate("/checkout")
  }

  return (
    <>
    <div className="container py-5">
      {/* 麵包屑 Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb fs-14">
          <li className="breadcrumb-item"><NavLink to="/">首頁</NavLink></li>
          <li className="breadcrumb-item"><NavLink to="/products">動物</NavLink></li>
          <li className="breadcrumb-item active">{product.animal}</li>
        </ol>
      </nav>

      <div className="row">
        
        {/* 左側：圖片區 */}

        <div className="col-md-6">
          {/* 1. 主圖輪播 (Main Swiper) */}
          <Swiper
            style={{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="main-swiper mb-3 rounded-1 shadow-sm"
          >
            {allImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img src={img} className="w-100 object-fit-cover" style={{ height: '520px' }} alt="main" />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 2. 縮圖輪播 (Thumbs Swiper) */}
          <Swiper
            onSwiper={setThumbsSwiper}
            slidesPerView={5.5} 
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="thumbs-swiper"
          >
            {allImages.map((img, idx) => (
              <SwiperSlide key={idx} className="cursor-pointer">
                <img 
                  src={img} 
                  className=" rounded-1 " 
                  style={{ height: '100px', width:'100px', objectFit: 'cover' }} 
                  alt="thumb" 
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="col-md-1"></div>

        {/* 右側：內容區 */}
        <div className="col-md-5">
          <p className="fw-bold fs-48 title-text-product mb-32">{product.title}</p>
          
          
          <div className="fs-20 fw-500 lh-base text-gray-500 mb-16">
            {product.description}
          </div>
          <div className="fs-20 fw-500 lh-base text-gray-500 ">
            <div>每​一​次​購買，​都​是​一​份​愛心</div>
          </div>
          <ul className="custom-list fs-20 fw-500 lh-base text-gray-500 mb-16">
            <li>每​筆​營收​的​一​部分，​專門​投入​於​動物​的​緊急​救治與​醫療</li>
            <li>每​個​商品​都​能​解鎖互​動式​追蹤​地圖，​售​出款​項​支援​保護​組織​工作</li>
          </ul>
          <div className="fs-20 fw-500 lh-base text-gray-500 mb-32">
            <div>現​在​就​加入，​讓​每​次​購買​都​成為拯​救​生命​的​關鍵​力量。​</div>
          </div>

          <div className="d-flex  align-items-center mb-24">
             <div className="d-flex align-items-center">
  {/* 減少數量按鈕 */}
  <button 
    type="button"
    className="btn btn-outline-dark rounded-circle d-flex align-items-center justify-content-center"
    style={{ width: '36px', height: '36px', padding: 0 }}
    onClick={() => setQty(q => Math.max(1, q - 1))}
    disabled={qty <= 1}
  >
    <i className="bi bi-dash-lg"></i>
  </button>
  
  {/* 數量顯示：使用 input 但拿掉邊框，模擬設計稿純文字感 */}
  <input 
    type="text" 
    className="form-control text-center bg-transparent border-0 fw-bold fs-20" 
    style={{ width: '60px' }}
    value={qty} 
    readOnly 
  />
  
  {/* 增加數量按鈕 */}
  <button 
    type="button"
    className="btn btn-outline-dark rounded-circle d-flex align-items-center justify-content-center"
    style={{ width: '36px', height: '36px', padding: 0 }}
    onClick={() => setQty(q => q + 1)}
  >
    <i className="bi bi-plus-lg"></i>
  </button>

  {/* 價格顯示：放在按鈕旁邊 (依據設計稿) */}
  
        </div>
        <span className="ms-auto text-primary-500 fw-bold fs-36">
           ${(product.price * qty).toLocaleString()}
        </span>
          </div>

       

          <div className="row g-12 mb-32">
            <div className="col-6">
              <button className="btn btn-outline-primary-500 w-100 py-3 fw-bold" onClick={handleBuyNow}>立即購買</button>
            </div>
            <div className="col-6">
              <button className="btn btn-primary-500 text-white w-100 py-3 fw-bold" onClick={addToCart}>加入購物車</button>
            </div>
          </div>

          {/* 備註小字 */}
          <div className="fs-18 fw-500 text-gray-300 lh-base">
            <div >*本​頁僅​含​吊墜​部分，​若須​鏈子​或​掛繩請點​選 <span><a href="#">額外​配​件</a></span>​</div>
            <div >*隨買 3 件或以上即可享有免運費！</div>
            <div >*售​出利潤​的​ 10% 捐給​我​們​的​非營利​合作​夥伴</div>
            <div >*產品符合 SSL 安全結帳</div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-gray-50">
      <div className="container py-120">
        <div className="fs-48 title-text-product mb-60 ">產品說明</div>
        <div className="fs-36 fw-700 text-gray-900 orange-vertical-line mb-32">每​件​飾品​都​是​一​份​愛心​，皆​可​追蹤​一​隻​真正​的
          {product.title?.replace('吊飾', '')}
          </div>
        <div className="row g-24">
  {product.content?.map((text, idx) => (
    <div className="col-md-3 mb-60" key={idx}>
      <div className="d-flex flex-column h-100">
        <img 
          src={product.contentImgsUrl[idx]} 
          className="img-fluid rounded-1 mb-3 object-fit-cover" 
          
          alt="介紹圖" 
        />
        <div>
          <div className="fs-20 ">{text}</div>
        </div>
      </div>
    </div>
    
    
  ))}
  <div className="fs-36 fw-700 text-gray-900 orange-vertical-line">追蹤是如何運作的</div>
  <ul className="custom-list fs-20 fw-500 lh-base text-gray-500 mb-16">
      <li>動物​的​追蹤​是​透過 ​GPS 項​圈​進行​的​</li>
      <li>GPS 訊號會​顯示​每​隻​動物​獨特​的​追蹤​路徑，​這些​路徑​數據​可能​是​即時​更新、​延遲​更新，​或​以​歷史​記錄​的​方式​呈現。​</li>
      <li>為確​保​動物​的​安全，​所有​透過​ GPS 項​圈​追蹤​所得​的​資訊​都​會​以​三種​形式​呈現：​即時​更新、​延遲​更新，​或是​歷史​記錄，​這樣​進​一步​的​保障​了​動物​在​野外​的​安全。​</li>
  </ul>
</div>
      </div>
    </div>
    <div className="container py-5 mt-5">
       <div className="fw-bold fs-48 title-text-product mb-32">客戶評價</div>
      
      {/* 統計區塊 */}
      <div className=" p-24 mb-5 bg-gray-50">
        <div className="row align-items-center">
          <div className="col-md-4 text-center">
            <h1 className="display-4 fw-bold text-gray-900 ">{data.summary.averageRating}</h1>
            <div className="text-gray-900  mb-2">★★★★★</div>
            <small className="text-muted">(共 {data.summary.totalReviews} 則評價)</small>
          </div>
          <div className="col-md-6">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="row align-items-center mb-1">
                <div className="col-2 text-end small">{star}.0</div>
                <div className="col-8">
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-warning" style={{ width: star >= 4 ? '50%' : '0%' }}></div>
                  </div>
                </div>
                <div className="col-2 small text-muted">{star >= 4 ? '50%' : '0%'}</div>
              </div>
            ))}
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>

      {/* 評論列表區塊 */}
      <div className="review-list">
        {data.reviews.map((review) => (
          <div key={review.id} className="border-bottom py-4">
            <div className="d-flex justify-content-between mb-2">
              <h6 className="fw-bold ">{review.userName}</h6>
              <small className="text-muted">{review.date}</small>
            </div>
            <div className="text-warning mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < review.rating ? '★' : '☆'}</span>
              ))}
            </div>
            <div className="d-flex justify-content-between">
              <p className="mb-3">{review.comment}</p>
            
            {/* 圖片展示 */}
            <div className="d-flex gap-3">
              {review.images.map((img, idx) => (
                <img key={idx} src={img} alt="review-img"  style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
              ))}
            </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
    
    </>
    
  );
};

export default ProductDetail
