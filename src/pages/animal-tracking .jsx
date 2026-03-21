import { useState ,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import '../style/_fonts.scss';
import "../style/all.scss";
import guardAnimalImg from '../image/track-img/guradAnimal.png';
import { useAuth } from "../hook/useAuth";
import request from "../utils/request";
import AnimalIntro from '../components/AnimalIntro';
import AnimalNews from '../components/AnimalNews';
import AnimalAsso from '../components/AnimalAsso';
import loveIcon from '../image/love.svg'; 

// const API_BASE = import.meta.env.VITE_URL;
const API_PATH = import.meta.env.VITE_PATH;


function AnimalTracking() {
  useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAssoIndex, setCurrentAssoIndex] = useState(1);

  const getArticles = async ()=>{
    try {
      const response = await request.get(`/api/${API_PATH}/admin/articles`); //利用request來取得token
      console.log('文章內容:',response.data)
      if (response.data.success) {
            setArticles(response.data.articles); 
          }

    } catch (error) {
      console.log("資料抓取失敗",error.response);
    }
  };
  
  useEffect(()=>{
    getArticles();
  },[])

  useEffect(() => {
  // 當 currentIndex (動物) 改變時，手動將機構設回 1
  setCurrentAssoIndex(1);
  
}, [currentIndex]); // <--- 監聽動物索引的變化

  const currentAnimal = articles[currentIndex] || {};

  return (
    <div className="animal-tracking-page overflow-hidden">
      <div>
      </div>
      <div className="pt-120 container px-12 px-xl-0">{/* RWD ok 字體大小還沒*/}
        <h1 className='text-serif title-underline fs-48 ' >我守護的動物們</h1>
      </div>
      <div>
        <div className="py-32 container px-12 px-xl-0"> {/* RWD ok 字體大小還沒*/}
          <div className="d-flex flex-nowrap overflow-x-auto pb-2 hide-scrollbar">
            {articles.length > 0 ? (
              articles.map((item, index) => (
                <button 
                  key={item.id} 
                  // 這裡判斷：如果目前的索引等於 currentIndex，就套用選中樣式，否則套用預設樣式
                  className={`btn flex-shrink-0 me-24 py-8 px-24 text-sans border-0 btn-secondary-50  
                    ${currentIndex === index 
                      ? 'btn-filled-active text-gray-900' // 選中時的樣式 (沿用你原本的 btn-filled-primary) 
                      : 'btn-secondary-50 text-gray-500'   // 未選中時的樣式
                    }`}
                  onClick={() => setCurrentIndex(index)} // 點擊時更新 state
                >
                  {item.title}
                </button>
              ))
            ) : (
              <button className="btn btn-secondary-50 flex-shrink-0 me-24 py-8 px-24 border-0">
                載入中...
              </button>
            )}
          </div>
        </div>
        {/* 確定讀到資料後,在顯示這個區塊 以防固定的位置跑掉 */}
        {articles.length > 0 && ( 
          <div className='container d-flex position-relative pb-120 px-12 px-xl-0 justify-content-xl-start justify-content-center'>
            <img 
              src={currentAnimal?.icon_image}
              alt={currentAnimal?.title}
              className='img-fluid'
            />
            <img 
              src={guardAnimalImg} 
              className='position-absolute photo-position' 
              alt="guradAnimal.png" 
            />
          </div>
        )}
      </div>
      {articles.length > 0 && (
        <>
          <div className="pt-120 container d-xl-flex d-block justify-content-between px-12 px-xl-0">
            <p className='text-serif fs-48 title-underline'>
              {currentAnimal?.title}的移動路徑
            </p>
            <p className='mt-auto d-flex fs-20 text-secondary justify-content-end '>
              <img src={loveIcon} alt="love-icon" className='love-size mt-auto'/>
              20000人追蹤中
            </p>
          </div>

          <div className='d-flex justify-content-center mt-32 pb-120 w-100 overflow-x-auto hide-scrollbar '>
            {/* 只有當 currentAnimal.map 真的有網址時，才渲染圖片 */}
            {currentAnimal?.map ? (
              <img src={currentAnimal?.map} alt="map" className='flex-shrink-0'/>
            ) : (
              <div className="text-secondary-300">地圖資料載入中...</div>
            )}
          </div>
        </>
      )}
      <AnimalIntro currentAnimal={currentAnimal} />
      <AnimalAsso 
        currentAnimal={currentAnimal} 
        currentAssoIndex={currentAssoIndex} 
        setCurrentAssoIndex={setCurrentAssoIndex} 
      />

      <AnimalNews 
        currentAnimal={currentAnimal} 
        currentAssoIndex={currentAssoIndex} 
      />
    </div>
  );
}

export default AnimalTracking;