import axios from 'axios';
import { useEffect, useState, useCallback } from "react";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import MechanismLogos from "../components/MechanismLogos";
import loveFill from '../image/love-fill.svg';
import love from '../image/love.svg';
import { createAsyncGetCart } from "../slice/cartSlice";

const { VITE_PATH, VITE_URL } = import.meta.env;

const mechanismImages = [
  { name: '台北市立動物園', imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771161922826.png" },
  { name: 'WildOne 野灣', imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771162111383.png" },
  { name: '保育機構_03.png', imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771163906842.png" },
  { name: '保育機構_04.png', imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771163947004.png" },
  { name: '保育機構_05.png', imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771164038605.png" },
  { name: '保育機構_06.png', imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771164084617.png" },
  { name: '保育機構_07.png', imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771164103587.png" },
  { name: '保育機構_08.png', imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/pawarm/1771164129948.png" }
];

const Products = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('fav');
    return saved ? JSON.parse(saved) : [];
  });
  const [products, setProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const toggleFavorite = (id) => {
    let updatedFavs;
    if (favorites.includes(id)) {
      updatedFavs = favorites.filter((favId) => favId !== id);
      toast('已從收藏清單移除', { icon: '🗑️' });
    } else {
      updatedFavs = [...favorites, id];
      toast.success('已加入關注清單！', { icon: '❤️' });
    }
    setFavorites(updatedFavs);
    localStorage.setItem('fav', JSON.stringify(updatedFavs));
  };

  const getProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`);
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
      toast.error("取得產品列表失敗");
    }
  }, []);

  const addCart = async (id, qty = 1) => {
    try {
      const cartData = { product_id: id, qty };
      await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/cart`, { data: cartData });
      dispatch(createAsyncGetCart());
    } catch (err) {
      console.error("購物車API錯誤:", err); // 🚩 解決 err unused
      throw err; // 丟出錯誤讓 handleAddToCart 捕捉
    }
  };

  const handleAddToCart = async (id) => {
    setIsLoading(true);
    try {
      await addCart(id);
      toast.success('已加入守護清單！', {
        duration: 3000,
        position: 'top-center',
        style: { background: '#333', color: '#fff' },
      });
    } catch (error) {
      console.error("加入失敗:", error); // 🚩 解決 error unused
      toast.error('加入失敗，請稍後再試');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    dispatch(createAsyncGetCart());
  }, [dispatch, getProducts]);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedFavs = JSON.parse(localStorage.getItem('fav')) || [];
      setFavorites(updatedFavs);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const filteredProducts = products.filter((product) => {
    const isCategoryMatch = filterCategory === "全部" || product.area === filterCategory;
    const isSearchMatch = 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.animal?.toLowerCase().includes(searchQuery.toLowerCase());
    return isCategoryMatch && isSearchMatch;
  });

  const categories = ["全部", ...new Set(products.map(p => p.area).filter(Boolean))];

  return (
    <>
      <div className="bg-primary-100 py-5">
        <div className="container">
          <div className="row g-3 justify-content-center">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search text-primary-500"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control border-start-0 py-2" 
                  placeholder="搜尋動物、機構或計畫名稱..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-3">
              <select 
                className="form-select py-2" 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-60">
        <div className="mb-4 text-gray-500 fs-14">
          目前共有 {filteredProducts.length} 項守護計畫
        </div>

        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="col-6 col-md-3 g-12 custom-card mb-4" key={product.id}>
                <div className="card product-card custom-card-bg border-0 h-100 shadow-sm" style={{ maxWidth: 320 }}>
                  <div className="position-relative overflow-hidden">
                    <Link to={`/product/${product.id}`}>
                      <img 
                        src={product.imageUrl} 
                        className="img-fluid w-100 object-fit-cover transition-transform" 
                        style={{ height: '280px' }}
                        alt={product.title} 
                      />
                    </Link>

                    <div className="position-absolute top-0 start-0 m-2 d-flex gap-2">
                      <span className="bg-primary-200 border border-primary-300 fs-14 px-12 py-4 newItem badge rounded-pill fw-bold mt-3 ms-3 text-dark">新品</span>
                    </div>

                    <button
                      type="button"
                      className="position-absolute top-0 end-0 m-3 bg-transparent border-0 z-3"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <img src={favorites.includes(product.id) ? loveFill : love} alt="favorite" />
                    </button>
                  </div>

                  <div className="card-body d-flex flex-column">
                    <Link to={`/product/${product.id}`} className="text-decoration-none">
                      <h6 className="fw-bold mb-1 fs-24 text-gray-900 text-truncate">{product.title}</h6>
                      <p className="fw-bold mb-16 fs-14 text-gray-500">{product.agency}</p>
                    </Link>
                    
                    <div className="mt-auto">
                      <div className="mb-3">
                        <span className="fw-bold fs-24 text-primary-500">${product.price.toLocaleString()}</span>
                        <del className="text-muted fw-normal ms-2 fs-20">${product.origin_price.toLocaleString()}</del>
                      </div>

                      <button 
                        type="button"
                        className="btn btn-outline-primary-500 w-100 fs-18 py-12 fw-bold" 
                        disabled={isLoading}
                        onClick={() => handleAddToCart(product.id)}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            加入中...
                          </>
                        ) : (
                          "加入購物車"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h3 className="text-gray-400">找不到符合「{searchQuery}」的計畫 🐾</h3>
              <button className="btn btn-link" onClick={() => {setSearchQuery(""); setFilterCategory("全部");}}>
                清除搜尋條件
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-primary-50 overflow-x-hidden">
        <MechanismLogos mechanismImages={mechanismImages} />
      </div>
    </>
  );
};

export default Products;