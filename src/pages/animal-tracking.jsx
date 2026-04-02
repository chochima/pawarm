import { useEffect, useState, useCallback } from "react";
import toast from 'react-hot-toast';
import axios from 'axios';
import AnimalAsso from '../components/AnimalAsso';
import AnimalIntro from '../components/AnimalIntro';
import AnimalNews from '../components/AnimalNews';
import { useAuth } from "../hook/useAuth";
import loveIcon from '../image/love.svg';
import guardAnimalImg from '../image/track-img/guradAnimal.png';
import '../style/_fonts.scss';
import "../style/all.scss";
//import request from "../utils/request";

//const API_PATH = import.meta.env.VITE_PATH;
const{VITE_PATH,VITE_URL}=import.meta.env;

function AnimalTracking() {
  useAuth();
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAssoIndex, setCurrentAssoIndex] = useState(1);

  // 取得文章列表 (使用 useCallback 避免不必要的函式重建)
  const getArticles = useCallback(async () => {
    try {
      const response = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/articles`);
      if (response.data.success) {
        setArticles(response.data.articles);

      } else {
        toast.error(response.data.message || '無法取得文章內容');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "資料抓取失敗，請檢查網路連線";
      toast.error(`抓取失敗：${errorMsg}`, { id: 'fetch-error' });
    }
  }, []);

  // 修正 react-hooks/set-state-in-effect
  useEffect(() => {
    const initFetch = async () => {
      await getArticles();
    };
    initFetch();
  }, [getArticles]);

  // 處理切換動物的行為
  const handleSwitchAnimal = (index) => {
    setCurrentIndex(index);
    // 直接在事件處理中重設機構索引
    setCurrentAssoIndex(1);
  };

  const currentAnimal = articles[currentIndex] || {};

  return (
    <div className="animal-tracking-page overflow-hidden">
      <div className="pt-120 container px-12 px-xl-0">
        <h1 className="text-serif title-underline fs-48">我守護的動物們</h1>
      </div>

      <div className="py-32 container px-12 px-xl-0">
        <div className="d-flex flex-nowrap overflow-x-auto pb-2 hide-scrollbar">
          {articles.length > 0 ? (
            articles.map((item, index) => (
              <button
                key={item.id}
                className={`btn flex-shrink-0 me-24 py-8 px-24 text-sans border-0
                  ${currentIndex === index
                ? 'btn-filled-active text-gray-900'
                : 'btn-secondary-50 text-gray-500'
              }`}
                onClick={() => handleSwitchAnimal(index)}
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

      {articles.length > 0 && (
        <div className="container d-flex position-relative pb-120 px-12 px-xl-0 justify-content-xl-start justify-content-center">
          <img
            src={currentAnimal?.icon_image}
            alt={currentAnimal?.title}
            className="img-fluid"
          />
          <img
            src={guardAnimalImg}
            className="position-absolute photo-position"
            alt="guard"
          />
        </div>
      )}

      {articles.length > 0 && (
        <>
          <div className="pt-120 container d-xl-flex d-block justify-content-between px-12 px-xl-0">
            <p className="text-serif fs-48 title-underline">
              {currentAnimal?.title}的移動路徑
            </p>
            <p className="mt-auto d-flex fs-20 text-secondary justify-content-end">
              <img src={loveIcon} alt="love" className="love-size mt-auto" />
              20000人追蹤中
            </p>
          </div>

          <div className="d-flex justify-content-center mt-32 pb-120 w-100 overflow-x-auto hide-scrollbar">
            {currentAnimal?.map ? (
              <img src={currentAnimal?.map} alt="map" className="flex-shrink-0" />
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