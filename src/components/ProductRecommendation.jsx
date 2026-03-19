import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { createAsyncGetCart } from "../slice/cartSlice";

// 記得引入 Swiper 必要樣式，否則會排版崩潰
import "swiper/css";
import "swiper/css/pagination";

import love from "../image/love.svg";
import loveFill from "../image/love-fill.svg";

const { VITE_PATH, VITE_URL } = import.meta.env;

const ProductRecommendation = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();


  const getCart = async () => {
    try {
      const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/cart`);
      setCart(res.data.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // 1. 抓取資料邏輯
  useEffect(() => {
    const getSixRandomProducts = async () => {
      try {
        const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`);
        const shuffled = [...res.data.products]
          .sort(() => 0.5 - Math.random())
          .slice(0, 6);
        setRandomProducts(shuffled);
      } catch (err) {
        console.error("抓取隨機資料失敗", err);
      }
    };
    getSixRandomProducts();
    getCart();
  }, []);

  // 2. 互動邏輯
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleAdd = async (id) => {
    if (isAdding) return; // 防止重複點擊
    setIsAdding(true);
    try {
      const data = { product_id: id, qty: 1 };
      await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/cart`, { data });
      
      await dispatch(createAsyncGetCart()).unwrap(); 
      
      console.log("購物車已更新");
    } catch (err) {
      console.error("加入購物車失敗", err);
      alert("加入失敗，請稍後再試");
    } finally {
      setIsAdding(false);
      getCart();
    }
  };

  // 3. 抽離卡片 JSX (確保手機與桌機版結構完全一致)
  const renderCard = (product) => (
    <div className="custom-card">
      <div className="card product-card custom-card-bg border-0 shadow-sm">
        {/* 圖片區 */}
        <div className="position-relative">
          <div className="position-absolute top-0 start-0 m-2 d-flex gap-2">
            <span className="bg-primary-200 border border-primary-300 fs-14 px-12 py-4 newItem badge rounded-pill fw-bold mt-3 ms-3">
              新品
            </span>
            <span className="bg-primary-100 border border-primary-300 fs-14 px-12 py-4 newItem badge rounded-pill fw-bold mt-3">
              台灣專屬
            </span>
          </div>

          <button
            type="button"
            className="position-absolute top-0 end-0 m-3 bg-transparent border-0 z-3"
            onClick={() => toggleFavorite(product.id)}
          >
            {favorites.includes(product.id) ? (
              <img src={loveFill} alt="lovefill" />
            ) : (
              <img src={love} alt="love" />
            )}
          </button>

          <img
            src={product.imageUrl}
            className="img-fluid shadow-sm "
            alt={product.title}
          />
        </div>

        {/* 內容 */}
        <div className="card-body d-flex flex-column">
          <h6 className="fw-bold mb-1 fs-24 text-gray-900">{product.title}</h6>
          <p className="fw-bold mb-16 fs-14 text-gray-500">{product.agency}</p>

          <div className="mt-auto">
            <div className="mb-3">
              <span className="fw-bold fs-24">${product.origin_price}</span>
              <del className="text-muted fw-normal ms-2 fs-20">
                ${product.price}
              </del>
            </div>

            <button
              className="btn btn-outline-primary-500 w-100 fs-18 py-16 fw-bold"
              onClick={() => handleAdd(product.id)}
              disabled={isAdding}
            >
              {isAdding ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "加入購物車"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50">
      <div className="container overflow-hidden">
        <div className="py-120">
          <div className="fs-36 fw-700 title-text-cart text-black mb-32">
            與牠們相遇：「下一位等著您守護的夥伴」
          </div>
          <div className="row">
            <div className="col-lg-9 col-12">
              {/* 手機版 Swiper */}
              <div className="d-md-none">
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={16}
                  slidesPerView={1.2}
                  pagination={{ clickable: true }}
                  className="my-5 pb-5 custom-swiper"
                >
                  {randomProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                      {renderCard(product)}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* 桌機版 Grid */}
              <div className="d-none d-md-block">
                <div className="row g-24">
                  {randomProducts.map((product) => (
                    <div className="col-4 g-12" key={product.id}>
                      {renderCard(product)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRecommendation;