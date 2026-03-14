import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import love from '../image/love.svg';
import loveFill from '../image/love-fill.svg';
import { createAsyncGetCart } from "../slice/cartSlice";
import { NavLink,Link } from "react-router";
import toast from 'react-hot-toast';
const { VITE_PATH, VITE_URL } = import.meta.env;

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
const Products = () => {
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  
  // 🚀 1. 新增分類與搜尋狀態
  const [filterCategory, setFilterCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`);
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  const addCart = async (id, qty = 1) => {
    try {
      const data = { product_id: id, qty };
      await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/cart`, { data });
      dispatch(createAsyncGetCart());

      toast.success('已加入守護清單！', {
    duration: 3000, // 持續 3 秒
    position: 'top-right', // 顯示在右上角
    style: {
      background: '#333',
      color: '#fff',
    },
  });
    } catch (err) {
      console.log("加入購物車失敗");
    }
  };

  useEffect(() => {
    getProducts();
    dispatch(createAsyncGetCart()); 
  }, [dispatch]);

  // 🚀 2. 核心邏輯：計算過濾後的產品清單
  const filteredProducts = products.filter((product) => {
    
    const isCategoryMatch = filterCategory === "全部" || product.area === filterCategory;
    // 關鍵字比對 (標題、機構、動物)
    const isSearchMatch = 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.animal?.toLowerCase().includes(searchQuery.toLowerCase());

    return isCategoryMatch && isSearchMatch;
  });

  // 🚀 3. 動態取得分類選單內容
  const categories = ["全部", ...new Set(products.map(p => p.area).filter(Boolean))];

  return (
    <>
      {/* 搜尋與分類控制區 */}
      <div className="bg-primary-100 py-5">
        <div className="container">
          <div className="row g-3 justify-content-center">
            {/* 搜尋框 */}
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
            <div className="col-md-3">

            </div>
            {/* 分類下拉選單 */}
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
        {/* 顯示目前結果數量 */}
        <div className="mb-4 text-gray-500 fs-14">
          目前共有 {filteredProducts.length} 項守護計畫
        </div>

        <div className="row">
          {/* 🚀 4. 使用過濾後的資料渲染 */}
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
  <div className="col-6 col-md-3 g-12 custom-card mb-4" key={product.id}>
    <div className="card product-card custom-card-bg border-0 h-100 shadow-sm" style={{ maxWidth: 320 }}>
      
      {/* 🚀 圖片區：包裹 Link 連結至詳細頁 */}
      <div className="position-relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.imageUrl} 
            className="img-fluid w-100 object-fit-cover transition-transform" 
            style={{ height: '280px' }} // 設定固定高度讓排版整齊
            alt={product.title} 
          />
        </Link>

        {/* 標籤區 */}
        <div className="position-absolute top-0 start-0 m-2 d-flex gap-2">
           <span className="bg-primary-200 border border-primary-300 fs-14 px-12 py-4 newItem badge rounded-pill fw-bold mt-3 ms-3">新品</span>
        </div>

        {/* 愛心按鈕：使用 e.preventDefault() 防止觸發 Link 跳轉 */}
        <button
          type="button"
          className="position-absolute top-0 end-0 m-3 bg-transparent border-0 z-3"
          onClick={(e) => {
            e.preventDefault(); 
            toggleFavorite(product.id);
          }}
        >
          {favorites.includes(product.id) ? (
            <img src={loveFill} alt="lovefill" />
          ) : (
            <img src={love} alt="love" />
          )}
        </button>
      </div>

      <div className="card-body d-flex flex-column">
        {/* 🚀 標題區：同樣包裹 Link */}
        <Link to={`/product/${product.id}`} className="text-decoration-none">
          <h6 className="fw-bold mb-1 fs-24 text-gray-900">{product.title}</h6>
        </Link>
        
        <p className="fw-bold mb-16 fs-14 text-gray-500">{product.agency}</p>

        {/* mt-auto 確保價格與按鈕永遠在底部對齊 */}
        <div className="mt-auto">
          <div className="mb-3">
            <span className="fw-bold fs-24 text-primary-500">${product.price.toLocaleString()}</span>
            <del className="text-muted fw-normal ms-2 fs-20">${product.origin_price.toLocaleString()}</del>
          </div>

          <button 
            className="btn btn-outline-primary-500 w-100 fs-18 py-12 fw-bold" 
            onClick={(e) => {
              e.preventDefault();
              addCart(product.id);
            }}
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
            ))
          ) : (
            <div className="col-12 text-center py-5 ">
              <h3 className="text-gray-400">找不到符合「{searchQuery}」的計畫 🐾</h3>
              <button className="btn btn-link" onClick={() => {setSearchQuery(""); setFilterCategory("全部");}}>
                清除搜尋條件
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 保育機構區塊 */}
      <div className="bg-primary-50 overflow-x-hidden">
        <div className="container py-120">
          <div className="fs-36 fw-700 title-text-cart text-black mb-32">瀏覽更多保育機構</div>
          <div className="row g-20 g-md-32 align-items-center">
            {(mechanismImages || []).map((item, index) => (
              <div className="col-6 col-md-3" key={index}>
                <NavLink className="logo-wrapper d-flex justify-content-center align-items-center">
                  <img src={item.imageUrl} alt={item.name} className="img-fluid partner-logo" style={{ maxHeight: '80px', width: 'auto', objectFit: 'contain' }} />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;