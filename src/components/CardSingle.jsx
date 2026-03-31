import axios from 'axios';
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { createAsyncGetCart } from "../slice/cartSlice";
// 🚩 1. 引入 PropTypes
import PropTypes from 'prop-types';

import loveFill from '../image/love-fill.svg';
import love from '../image/love.svg';

const { VITE_PATH, VITE_URL } = import.meta.env;

const CardSingle = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('fav')) || [];
    setIsFavorite(favs.includes(product.id));
  }, [product.id]);

  const toggleFavorite = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const favs = JSON.parse(localStorage.getItem('fav')) || [];
    let updatedFavs;
    
    if (favs.includes(id)) {
      updatedFavs = favs.filter(favId => favId !== id);
      toast('已從收藏移除', { icon: '🗑️' });
    } else {
      updatedFavs = [...favs, id];
      toast.success('已加入我的關注');
    }
    
    localStorage.setItem('fav', JSON.stringify(updatedFavs));
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new Event('storage'));
  };

  const handleAddCart = async (e, product_id, qty = 1) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAdding) return;
    setIsAdding(true);

    try {
      const res = await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/cart`, {
        data: { product_id, qty }
      });

      if (res.data.success) {
        toast.success("已加入守護清單");
        dispatch(createAsyncGetCart());
      }
    } catch (err) {
      toast.error("加入失敗，請稍後再試");
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="custom-card">
        <Link to={`/product/${product.id}`} className="text-decoration-none">
          <div className="card product-card custom-card-bg border-0">
            <div className="position-relative">
              <div className="position-absolute top-0 start-0 m-2 d-flex gap-2">
                <span className="bg-primary-200 border border-primary-300 fs-14 px-12 py-4 badge newItem rounded-pill fw-bold">新品</span>
                <span className="bg-primary-100 border border-primary-300 fs-14 px-12 py-4 badge newItem rounded-pill fw-bold">台灣專屬</span>
              </div>

              <button
                type="button"
                className="position-absolute top-0 end-0 m-3 bg-transparent border-0 z-3"
                onClick={(e) => toggleFavorite(e, product.id)}
              >
                <img src={isFavorite ? loveFill : love} alt="favorite-icon" />
              </button>

              <img
                src={product.imageUrl}
                className="card-img-top object-fit-cover shadow-sm"
                style={{ height: '240px' }}
                alt={product.title}
              />
            </div>

            <div className="card-body d-flex flex-column">
              <h6 className="fw-bold mb-1 fs-24 text-gray-900">{product.title}</h6>
              <p className="fw-bold mb-16 fs-14 text-gray-500">{product.agency}</p>

              <div className="mb-3 mt-auto">
                <span className="fw-bold fs-24 text-primary">${product.price}</span>
                {product.origin_price !== product.price && (
                  <del className="text-muted fw-normal ms-2 fs-20">${product.origin_price}</del>
                )}
              </div>

              <button
                className="btn btn-outline-primary-500 w-100 fs-18 py-12 fw-bold d-flex align-items-center justify-content-center"
                onClick={(e) => handleAddCart(e, product.id)}
                disabled={isAdding}
              >
                {isAdding ? (
                  <span className="spinner-border spinner-border-sm me-2"></span>
                ) : null}
                {isAdding ? "處理中..." : "加入購物車"}
              </button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

// 🚩 2. 設定 PropTypes 驗證
CardSingle.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    agency: PropTypes.string,
    price: PropTypes.number.isRequired,
    origin_price: PropTypes.number.isRequired,
  }).isRequired,
};

export default CardSingle;