import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import loveFill from '../image/love-fill.svg';
import love from '../image/love.svg';

const PartnerSection = ({ 
  randomProducts, 
  favorites, 
  toggleFavorite, 
  handleAdd, 
  isAdding 
}) => {
  return (
    <div className="bg-gray-50">
      {/* 修正：移除 overflow-hidden，否則分頁點點會被切掉 */}
      <div className="container">
        <div className="py-120">
          <div className="fs-36 fw-700 title-text-cart text-black mb-32">
            與牠們相遇：「下一位等著您守護的夥伴」
          </div>
          <div className="row">
            <div className="col-lg-9">
              
              {/* 手機版 Swiper 容器 */}
              <div className="d-md-none">
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={16}
                  slidesPerView={1.2}
                  pagination={{ clickable: true }}
                  // pb-5 是為了留空間給下方的點點
                  className="my-5 pb-5 custom-swiper"
                >
                  {randomProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                      <div className="card border-0 shadow-sm">
                        <div className="custom-card">
                          <div className="card product-card custom-card-bg">
                            {/* 圖片區 */}
                            <div className="position-relative">
                              <div className="position-absolute top-0 start-0 m-2 d-flex gap-2">
                                <span className="bg-primary-200 border border-primary-300 fs-14 px-12 py-4 newItem badge rounded-pill fw-bold mt-3 ms-3">新品</span>
                                <span className="bg-primary-100 border border-primary-300 fs-14 px-12 py-4 newItem badge rounded-pill fw-bold mt-3">台灣專屬</span>
                              </div>

                              <button
                                type="button"
                                className="position-absolute top-0 end-0 m-3 bg-transparent border-0"
                                onClick={() => toggleFavorite(product.id)}
                              >
                                {favorites.includes(product.id) ? <img src={loveFill} alt="lovefill" /> : <img src={love} alt="love" />}
                              </button>

                              <img
                                src={product.imageUrl}
                                className="img-fluid shadow-sm"
                                alt={product.title}
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

                              <button 
                                className="btn btn-outline-primary-500 w-100 fs-18 py-16 fw-bold" 
                                onClick={() => handleAdd(product.id)}
                                disabled={isAdding}
                              >
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
                  {randomProducts.map((product) => (
                    <div className="col-4 g-12 custom-card" key={product.id}>
                      <div className="card product-card custom-card-bg" style={{ maxWidth: 320 }}>
                        <div className="position-relative">
                          <div className="position-absolute top-0 start-0 m-2 d-flex gap-2">
                            <span className="bg-primary-200 border border-primary-300 fs-14 px-12 py-4 newItem badge rounded-pill fw-bold mt-3 ms-3">新品</span>
                            <span className="bg-primary-100 border border-primary-300 fs-14 px-12 py-4 newItem badge rounded-pill fw-bold mt-3">台灣專屬</span>
                          </div>

                          <button
                            type="button"
                            className="position-absolute top-0 end-0 m-3 bg-transparent border-0"
                            onClick={() => toggleFavorite(product.id)}
                          >
                            {favorites.includes(product.id) ? <img src={loveFill} alt="lovefill" /> : <img src={love} alt="love" />}
                          </button>

                          <img
                            src={product.imageUrl}
                            className="img-fluid shadow-sm"
                            alt={product.title}
                          />
                        </div>

                        <div className="card-body">
                          <h6 className="fw-bold mb-1 fs-24 text-gray-900">{product.title}</h6>
                          <p className="fw-bold mb-16 fs-14 text-gray-500 ">{product.agency}</p>
                          <div className="mb-3">
                            <span className="fw-bold fs-24">${product.origin_price}</span>
                            <del className="text-muted fw-normal ms-2 fs-20">${product.price}</del>
                          </div>
                          <button 
                            className="btn btn-outline-primary-500 w-100 fs-18 py-16 fw-bold" 
                            onClick={() => handleAdd(product.id)}
                            disabled={isAdding}
                          >
                            {isAdding ? (<span className="spinner-border spinner-border-sm" role="status"></span>) : '加入購物車'}
                          </button>
                        </div>
                      </div>
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

export default PartnerSection;