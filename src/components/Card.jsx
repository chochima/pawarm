import { useState,useEffect } from "react";
import  axios from 'axios'
import love from '../image/love.svg'
import loveFill from '../image/love-fill.svg'



const{VITE_PATH,VITE_URL}=import.meta.env;

export default function ProductCard() {
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);


  const toggleFavorite = (id) => {
  if (favorites.includes(id)) {
    // 如果已經在清單裡，就濾掉它 (取消收藏)
    setFavorites(favorites.filter((favId) => favId !== id));
  } else {
    // 如果不在清單裡，就加進去 (新增收藏)
    setFavorites([...favorites, id]);
  }
};

  const getProducts=async()=>{

    try{
      const res=await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`);
      console.log(res.data.products);
      setProducts(res.data.products);
    }catch(err){
       console.log(err);
    }

  }
  useEffect(()=>{
    getProducts();
  },[])
  return (
    <>

    <div className="container">
      <div className="row">
        {
          products.map((product)=>{
             return(
              <div className="col-6 col-md-3 g-12" key={product.id}>
                <div className="card product-card" style={{ maxWidth: 320 }}>
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
          className="position-absolute top-0 end-0 m-3 border border-0"
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
        <p className="fw-bold mb-16 fs-20 text-gray-500 ">{product.agency}</p>

        <div className="mb-3">
          <span className="fw-bold fs-24">${product.origin_price}</span>
          <del className="text-muted fw-normal ms-2 fs-20">${product.price}</del>
        </div>

        <button className="btn btn-outline-primary-500 w-100 fs-18 py-16 fw-bold">
          加入購物車
        </button>
      </div>
    </div>
              </div>
             )
          })
        }
      </div>
    </div>
    
    </>

  );
  
}
