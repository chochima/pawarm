import { useState, useEffect, useRef } from "react";
import  axios from 'axios'
import love from '../image/love.svg'
import loveFill from '../image/love-fill.svg'

import { currency} from"../utils/filter";


const{VITE_PATH,VITE_URL}=import.meta.env;


const CardSingle=()=>{
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
      .slice(0, 1); // 切取前 1 筆

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
  // handleAdd + addCart 改寫
const addCart = async (id, qty = 1) => {
  try {
    const data = { product_id: id, qty };
    await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/cart`, { data });

    // 直接更新本地 cart，不再呼叫 getCart()
    setCart(prevCart => {
      // 檢查是否已經有這個商品
      const existIndex = prevCart.findIndex(item => item.product_id === id);
      if (existIndex !== -1) {
        // 已有商品，更新數量
        const newCart = [...prevCart];
        newCart[existIndex].qty += qty;
        return newCart;
      } else {
        // 新商品，加入陣列
        return [...prevCart, { product_id: id, qty }];
      }
    });

    alert("已成功加入守護清單！");
  } catch (err) {
    console.log("加入購物車失敗", err);
  }
};

const handleAdd = async (id) => {
  if (isAdding) return; // 防止快速重複點擊
  setIsAdding(true);
  await addCart(id);
  setIsAdding(false);
};



    useEffect(() => {
    getCart();
    getSixRandomProducts();
  }, []);

  return (
    <>
    <div className="">
        {randomProducts.map(product => (
             <div className="card border-0 shadow-sm" key={product.id}>
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
        
                <button
  className="btn btn-outline-primary-500 w-100 fs-18 py-16 fw-bold"
  onClick={() => handleAdd(product.id)}
  disabled={isAdding}
>
  {isAdding ? (
    <span className="spinner-border spinner-border-sm" role="status"></span>
  ) : (
    "加入購物車"
  )}
</button>
              </div>
                         </div>
                      </div>
             </div>
        ))}
    </div>
    </>
  )
}

export default CardSingle;