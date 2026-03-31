import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types'; // 🚩 補上 PropTypes 引入

import loveFill from '../image/love-fill.svg';
import love from '../image/love.svg';

// 🚩 提取重複的卡片 UI 為獨立組件
const ProductCard = ({ product, isFavorite, onToggleFavorite, onAdd, isAdding }) => (
  <div className="card product-card custom-card-bg border-0 h-100 shadow-sm">
    <div className="position-relative">
      <div className="position-absolute top-0 start-0 m-2 d-flex gap-2" style={{ zIndex: 2 }}>
        <span className="bg-primary-200 border border-primary-300 fs-14 px-12 py-4 badge rounded-pill fw-bold">新品</span>
        <span className="bg-primary-100 border border-primary-300 fs-14 px-12 py-4 badge rounded-pill fw-bold">台灣專屬</span>
      </div>

      <button
        type="button"
        className="position-absolute top-0 end-0 m-3 bg-transparent border-0"
        style={{ zIndex: 2 }}
        onClick={() => onToggleFavorite(product.id)}
      >
        <img src={isFavorite ? loveFill : love} alt={isFavorite ? "已收藏" : "加入收藏"} />
      </button>

      <img
        src={product.imageUrl}
        className="card-img-top object-fit-cover shadow-sm"
        alt={product.title}
        style={{ height: '240px' }}
      />
    </div>

    <div className="card-body d-flex flex-column">
      <h6 className="fw-bold mb-1 fs-24 text-gray-900">{product.title}</h6>
      <p className="fw-bold mb-16 fs-14 text-gray-500">{product.agency}</p>

      <div className="mt-auto">
        <div className="mb-3">
          <span className="fw-bold fs-24">${product.price?.toLocaleString()}</span>
          {product.origin_price > product.price && (
            <del className="text-muted fw-normal ms-2 fs-20">${product.origin_price?.toLocaleString()}</del>
          )}
        </div>

        <button 
          className="btn btn-outline-primary-500 w-100 fs-18 py-16 fw-bold" 
          onClick={() => onAdd(product.id)}
          disabled={isAdding}
        >
          {isAdding ? (
            <span className="spinner-border spinner-border-sm" role="status"></span>
          ) : '加入購物車'}
        </button>
      </div>
    </div>
  </div>
);

// 🚩 補齊卡片型別驗證
ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  isAdding: PropTypes.bool
};

const PartnerSection = ({ 
  randomProducts = [], 
  favorites = [], 
  toggleFavorite, 
  handleAdd, 
  isAdding 
}) => {
  return (
    <div className="bg-gray-50 overflow-hidden">
      <div className="container">
        <div className="py-120">
          <div className="fs-36 fw-700 title-text-cart text-black mb-32">
            與牠們相遇：「下一位等著您守護的夥伴」
          </div>
          
          <div className="row">
            <div className="col-lg-12"> {/* 🚩 建議改為 col-12 以獲得更好的寬度控制 */}
              
              {/* 手機版 Swiper */}
              <div className="d-md-none">
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={16}
                  slidesPerView={1.2}
                  pagination={{ clickable: true }}
                  className="pb-5 custom-swiper"
                >
                  {randomProducts.map((product) => (
                    <SwiperSlide key={product.id} className="h-auto">
                      <ProductCard 
                        product={product}
                        isFavorite={favorites.includes(product.id)}
                        onToggleFavorite={toggleFavorite}
                        onAdd={handleAdd}
                        isAdding={isAdding}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* 桌機版 Grid */}
              <div className="d-none d-md-block">
                <div className="row g-24">
                  {randomProducts.map((product) => (
                    <div className="col-md-4" key={product.id}>
                      <ProductCard 
                        product={product}
                        isFavorite={favorites.includes(product.id)}
                        onToggleFavorite={toggleFavorite}
                        onAdd={handleAdd}
                        isAdding={isAdding}
                      />
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

// 🚩 補齊主組件型別驗證
PartnerSection.propTypes = {
  randomProducts: PropTypes.array,
  favorites: PropTypes.array,
  toggleFavorite: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  isAdding: PropTypes.bool
};

export default PartnerSection;