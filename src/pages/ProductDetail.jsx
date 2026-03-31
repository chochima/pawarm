import axios from "axios";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router";
import { createAsyncGetCart } from "../slice/cartSlice";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const { VITE_PATH, VITE_URL } = import.meta.env;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [data, setData] = useState({ summary: { averageRating: 0, totalReviews: 0 }, reviews: [] });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 取得評論資料
    const getReviews = async () => {
      try {
        const res = await fetch('https://pawarm-api.onrender.com/api/reviews');
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("抓取評論失敗:", err);
      }
    };

    // 取得單一產品資料
    const getProduct = async () => {
      try {
        const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/product/${id}`);
        if (res.data.success) {
          setProduct(res.data.product);
        } else {
          toast.error("找不到該商品資訊");
        }
      } catch (err) {
        const errorMsg = err.response?.data?.message || "讀取產品失敗";
        toast.error(`錯誤：${errorMsg}`, { id: 'product-detail-error' });
      }
    };

    getReviews();
    getProduct();
  }, [id]); // 依賴項為 id，當路由變換時重新抓取

  const allImages = [product.imageUrl, ...(product.imagesUrl || [])].filter(Boolean);

  // 加入購物車
  const addToCart = async () => {
    try {
      const cartData = { product_id: id, qty };
      await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/cart`, { data: cartData });
      dispatch(createAsyncGetCart());
      toast.success('已加入守護清單！', {
        duration: 3000,
        position: 'top-center',
        style: { background: '#333', color: '#fff' },
      });
    } catch (err) {
      toast.error('加入失敗，請稍後再試', {
        duration: 3000,
        position: 'top-center',
        style: { background: '#333', color: '#fff' },
      });
      console.error("加入購物車出錯:", err);
    }
  };

  const handleBuyNow = async () => {
    await addToCart();
    toast.success('已加入守護清單，準備前往結帳！');
    navigate("/carts");
  };

  const visibleReviews = showAllReviews ? data.reviews : data.reviews.slice(0, 3);

  return (
    <>
      <div className="container py-5">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb fs-14">
            <li className="breadcrumb-item"><NavLink to="/">首頁</NavLink></li>
            <li className="breadcrumb-item"><NavLink to="/products">動物</NavLink></li>
            <li className="breadcrumb-item active">{product.animal}</li>
          </ol>
        </nav>

        <div className="row">
          {/* 左側：圖片區 */}
          <div className="col-xl-6">
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
                    className="rounded-1"
                    style={{ height: '100px', width: '100px', objectFit: 'cover' }}
                    alt="thumb"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="col-xl-1"></div>

          {/* 右側：內容區 */}
          <div className="col-xl-5">
            <p className="fw-bold fs-48 title-text-product mb-32">{product.title}</p>
            <div className="fs-20 fw-500 lh-base text-gray-500 mb-16">{product.description}</div>
            <div className="fs-20 fw-500 lh-base text-gray-500">
              <div>每一次購買，都是一份愛心</div>
            </div>
            <ul className="custom-list fs-20 fw-500 lh-base text-gray-500 mb-16">
              <li>每筆營收的一部分，專門投入於動物的緊急救治與醫療</li>
              <li>每個商品都能解鎖互動式追蹤地圖，售出款項支援保護組織工作</li>
            </ul>
            <div className="fs-20 fw-500 lh-base text-gray-500 mb-32">
              <div>現在就加入，讓每次購買都成為拯救生命的關鍵力量。</div>
            </div>

            <div className="d-flex align-items-center mb-24">
              <div className="d-flex align-items-center">
                <button
                  type="button"
                  className="btn btn-outline-dark rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '36px', height: '36px', padding: 0 }}
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                >
                  <i className="bi bi-dash-lg"></i>
                </button>
                <input
                  type="text"
                  className="form-control text-center bg-transparent border-0 fw-bold fs-20"
                  style={{ width: '60px' }}
                  value={qty}
                  readOnly
                />
                <button
                  type="button"
                  className="btn btn-outline-dark rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '36px', height: '36px', padding: 0 }}
                  onClick={() => setQty(q => q + 1)}
                >
                  <i className="bi bi-plus-lg"></i>
                </button>
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

            <div className="fs-18 fw-500 text-gray-300 lh-base">
              <div>*本頁僅含吊墜部分，若須鏈子或掛繩請點選 <span><a href="#">額外配件</a></span></div>
              <div>*隨買 3 件或以上即可享有免運費！</div>
              <div>*售出利潤的 10% 捐給我們的非營利合作夥伴</div>
              <div>*產品符合 SSL 安全結帳</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="container py-120">
          <div className="fs-48 title-text-product mb-60">產品說明</div>
          <div className="fs-36 fw-700 text-gray-900 orange-vertical-line mb-32">
            每件飾品都是一份愛心，皆可追蹤一隻真正的 {product.title?.replace('吊飾', '')}
          </div>
          <div className="row g-24">
            {product.content?.map((text, idx) => (
              <div className="col-md-3 mb-60" key={idx}>
                <div className="d-flex flex-column h-100">
                  <img
                    src={product.contentImgsUrl?.[idx]}
                    className="img-fluid rounded-1 mb-3 object-fit-cover"
                    alt="介紹圖"
                  />
                  <div><div className="fs-20">{text}</div></div>
                </div>
              </div>
            ))}
            <div className="fs-36 fw-700 text-gray-900 orange-vertical-line">追蹤是如何運作的</div>
            <ul className="custom-list fs-20 fw-500 lh-base text-gray-500 mb-16 ps-32">
              <li>動物的追蹤是透過 GPS 項圈進行的</li>
              <li>GPS 訊號會顯示每隻動物獨特的追蹤路徑，數據可能即時或延遲。</li>
              <li>為確保安全，所有追蹤資訊會以即時、延遲或歷史記錄呈現。</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container py-5 mt-5">
        <div className="fw-bold fs-48 title-text-product mb-32">客戶評價</div>
        <div className="p-24 mb-5 bg-gray-50">
          <div className="row align-items-center">
            <div className="col-md-4 text-center">
              <h1 className="display-4 fw-bold text-gray-900">{data.summary.averageRating}</h1>
              <div className="text-gray-900 mb-2">★★★★★</div>
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
          </div>
        </div>

        <div className="review-list">
          {visibleReviews.map((review) => (
            <div key={review.id} className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold mb-0">{review.userName}</h6>
                <small className="text-muted">{review.date}</small>
              </div>
              <div className="text-warning mb-2">
                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
              </div>
              <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                <p className="text-gray-700">{review.comment}</p>
                <div className="d-flex gap-2">
                  {review.images?.map((img, idx) => (
                    <img key={idx} src={img} className="rounded object-fit-cover" style={{ width: '80px', height: '80px' }} alt="review" />
                  ))}
                </div>
              </div>
            </div>
          ))}

          {data.reviews.length > 3 && (
            <div className="text-center mt-5">
              <button
                className="btn btn-outline-primary-500 px-5 py-2 fw-bold"
                onClick={() => setShowAllReviews(!showAllReviews)}
              >
                {showAllReviews ? "收起評論" : `查看更多評價 (${data.reviews.length})`}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;