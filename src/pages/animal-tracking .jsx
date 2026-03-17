import { useState ,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import '../style/_fonts.scss';
import "../style/all.scss";
import guardAnimalImg from '../image/track-img/guradAnimal.png';
import waveUp from '../image/track-img/wave-up.png';
import waveDown from '../image/track-img/wave-down.png';

import { NavLink } from 'react-router-dom';
const API_BASE = import.meta.env.VITE_URL;
const API_PATH = import.meta.env.VITE_PATH;


function AnimalTracking() {

  const [products , setProducts] = useState([]);
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAssoIndex, setCurrentAssoIndex] = useState(1);


  // const autoLogin = async () =>{
  //   try {
  //       // e.preventDefault();
  //       const response = await axios.post(`${API_BASE}/admin/signin`,formData)
  //       console.log(response.data);
  //       const { token, expired} = response.data;
  //       document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
  //       axios.defaults.headers.common['Authorization'] = token;
  //       getArticles();


  //   } catch (error) {
  //       // setIsAuth(false);
  //       console.log(error.response)
  //   }
  // }

  const getArticles = async ()=>{
    try {
      const response = await axios.get(`${API_BASE}/api/${API_PATH}/admin/articles`)
      
      console.log('文章內容:',response.data)
      if (response.data.success) {
            setArticles(response.data.articles); 
          }

    } catch (error) {
      console.log(error.response);
    }
  };
  
  useEffect(()=>{

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];
    if (token){
      axios.defaults.headers.common['Authorization'] = token;
      getArticles();
    } else{
      navigate("/Login");


    }
  },[navigate])
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
              src={articles[currentIndex]?.icon_image} 
              alt={articles[currentIndex]?.title} 
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
      
      <div className="pt-120 container d-xl-flex d-block justify-content-between px-12 px-xl-0">
        <p className='text-serif fs-48 title-underline ' >{articles[currentIndex]?.title}的移動路徑</p>
        <p className='mt-auto d-flex fs-20 text-secondary justify-content-end '><img src="src\image\love.svg" alt="love-icon" className='love-size mt-auto'/>20000人追蹤中</p>
      </div>
      <div className='d-flex justify-content-center mt-32 pb-120 w-100  overflow-x-auto hide-scrollbar '>
        <img src={articles[currentIndex]?.map} alt="map" className='flex-shrink-0'/>
      </div>
      <div className="overflow-hidden">
        <img src={waveUp} alt="wave-up" className='w-100 d-block'/>
        <div className='bg-secondary-50 py-120 '>
          <div className='container  px-12 px-xl-0 '>
            <p className='text-serif fs-48 title-underline' >{articles[currentIndex]?.title}介紹</p>
            <div className='row g-48 px-xxl-0 px-12 d-flex '>
              <div className="col-xl-4 d-flex flex-column">
                <img src={articles[currentIndex]?.image_1} alt="description-1" className='w-100 description-img-max mx-auto mx-xl-0'/>
                <h4 className='fw-700 fs-24 text-secondary-900 pt-8'>{articles[currentIndex]?.subject_1}​</h4>
                <p className='fw-500 fs-20 text-secondary-500'>{articles[currentIndex]?.content_1}​</p>   
              </div>
              <div className="col-xl-4  d-flex flex-column">
                <img src={articles[currentIndex]?.image_2} alt="description-2" className='w-100 description-img-max mx-auto mx-xl-0'/>
                <h4 className='fw-700 fs-24 text-secondary-900 pt-8'>{articles[currentIndex]?.subject_2}​​</h4>
                <p className='fw-500 fs-20 text-secondary-500'>{articles[currentIndex]?.content_2}​</p>
              </div>
              <div className="col-xl-4 d-flex flex-column">
                <img src={articles[currentIndex]?.image_3} alt="description-3" className='w-100 description-img-max mx-auto mx-xl-0'/>
                <h4 className='fw-700 fs-24 text-secondary-900 pt-8'>{articles[currentIndex]?.subject_3}</h4>
                <p className='fw-500 fs-20 text-secondary-500'>{articles[currentIndex]?.content_3}​​</p>
              </div>
            </div>
        </div>
        </div>
        <img src={waveDown} alt="wave-down" className='w-100 d-block' />
      </div>
      <div className="pt-120 container px-12 px-xl-0">
        <p className='text-serif fs-48 title-underline' >{articles[currentIndex]?.title}保育機構</p>
      </div>
      <div className="pt-32 container px-12 px-xl-0">
        <div className='d-flex flex-nowrap overflow-x-auto  pb-2 hide-scrollbar'>
          {[1, 2, 3].map((num) => {
            const name = articles[currentIndex]?.[`assoName_${num}`];
            
            // 如果該欄位有名字才顯示按鈕
            return name ? (
              <button 
                key={num}
                className={`btn flex-shrink-0 me-24 py-8 px-24 text-sans border-0 
                  ${currentAssoIndex === num 
                    ? 'btn-filled-active text-gray-900' // 選中樣式
                    : 'btn-secondary-50 text-gray-500'   // 未選中樣式
                  }`}
                onClick={() => setCurrentAssoIndex(num)} // 點擊時切換為 1, 2 或 3
              >
                {name}
              </button>
            ) : null;
          })}
          
        </div>
        <div className=' height-360 mt-32 px-48 '>
          <div className='row h-100 d-flex justify-content-center align-items-center'>
            <div className="col-lg-6 d-flex justify-content-center ">
              <img src={articles[currentIndex]?.[`assoImg_${currentAssoIndex}`]} className="" alt="logo" />
            </div>
            <div className="col-lg-6 ">
              <h4 className='text-gray-900 fw-700 fs-24 mb-16'>{articles[currentIndex]?.[`assoName_${currentAssoIndex}`]}</h4>
              <p className='fw-500 fs-20 text-secondary-500 mb-0'>
                {articles[currentIndex]?.[`assoSubject_${currentAssoIndex}`]}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='container pt-32  px-12 px-lg-0 pb-48 pb-lg-120'>
        <div className="row gx-20 gy-20 gx-lg-48 gy-lg-48">
          {/* <div className="col-lg-6 ">
            <div className="d-flex align-items-center justify-content-start shadow rounded  bg-secondary-50">
              <img
                src="src/image/track-img/leopard-cat-conservation-logo-240.png"
                alt="conservation-1"
                className="Asso-size "
              />
              <div className='px-12 py-12 px-lg-36'>
                <p className="mb-12 text-secondary-300 fw-400 fs-16 ">2025 年 12 月 15 日</p>
                <p className="fw-bold mb-12 text-secondary-900 fs-20">臺灣石虎保育協會 11 月工作報告 & 捐款徵信</p>
                <p className="fs-18 fw-400 text-secondary-500">感謝虎友們對石虎的關心與支持，馬上來看看協會 11 月的工作成果吧！</p>
              </div>
            </div>
          </div>

          <div className="col-lg-6 ">
            <div className="d-flex align-items-center justify-content-start shadow rounded  bg-secondary-50">
              <img
                src="src/image/track-img/leopard-cat-conservation-news-2.png"
                alt="conservation-2"
                className="Asso-size "
              />
              <div className='px-12 py-12 px-lg-36'>
                <p className="mb-12 text-secondary-300 fw-400 fs-16">2025 年 12 月 1 日</p>
                <p className="fw-bold mb-12 text-secondary-900 fs-20">石虎 × 臺灣白海豚 保育｜新春公益捐款回饋</p>
                <p className="fs-18 fw-400 text-secondary-500">捐款 285 元，領取限量春聯與紅包袋，包個別具意義的紅包給石虎與牠的好朋友吧！</p>
              </div>
            </div>
          </div>

          <div className="col-lg-6 ">
            <div className="d-flex align-items-center justify-content-start shadow  rounded bg-secondary-50">
              <img
                src="src/image/track-img/leopard-cat-conservation-news-3.png"
                alt="conservation-3"
                className="Asso-size"
              />
              <div className='px-12 py-12 px-lg-36'>
                <p className="mb-12 text-secondary-300 fw-400 fs-16">2025 年 11 月 15 日</p>
                <p className="fw-bold mb-12 text-secondary-900 fs-20">對野生動物友善的標章 & 它的產地</p>
                <p className="fs-18 fw-400 text-secondary-500">近日「友善石虎農作標章」走進大眾視野，相信虎友們一定摩拳擦掌，想用新台幣支持友善農作。</p>
              </div>
            </div>
          </div>

          <div className="col-lg-6 ">
            <div className="d-flex align-items-center justify-content-start shadow rounded bg-secondary-50">
              <img
                src="src/image/track-img/leopard-cat-conservation-news-4.png"
                alt="conservation-4"
                className="Asso-size "
              />
              <div className='px-12 py-12 px-lg-36'>
                <p className="mb-12 text-secondary-300 fw-400 fs-16">2025 年 10 月 27 日</p>
                <p className="fw-bold mb-12 text-secondary-900 fs-20">石虎重要廊道植被遭清空？！</p>
                <p className="fs-18 fw-400 text-secondary-500">50 隻以上的石虎會利用的重要環境——苗栗後龍溪至西湖溪的高灘地，整片植被遭清理一空😱</p>
              </div>
            </div>
          </div> */}

          {[1, 2, 3, 4].map((num) => {
            // 1. 動態組合 Key 名稱
            const newsDate = articles[currentIndex]?.[`newsDate_${currentAssoIndex}_${num}`];
            const newsSubject = articles[currentIndex]?.[`newsSubject_${currentAssoIndex}_${num}`];
            const newsContent = articles[currentIndex]?.[`newsContent_${currentAssoIndex}_${num}`];
            const newsImg = articles[currentIndex]?.[`newsImg_${currentAssoIndex}_${num}`];

                        // 2. 只有當標題存在時，才渲染這則新聞卡片
                        return newsSubject ? (
                          <div className="col-lg-6" key={num}>
                            <div className="d-flex align-items-center justify-content-start shadow rounded bg-secondary-50 h-100">
                              {/* 新聞圖片：套用你剛設定的縮放裁切 CSS */}
                              <img
                                src={newsImg}
                                alt={`news-${num}`}
                                className="Asso-size object-fit-cover"
                                style={{ width: '240px', height: '240px', flexShrink: 0 }}
                              />

                              <div className='px-12 py-12 px-lg-36'>
                                <p className="mb-12 text-secondary-300 fw-400 fs-16">
                                  {newsDate}
                                </p>
                                <p className="fw-bold mb-12 text-secondary-900 fs-20">
                                  {newsSubject}
                                </p>
                                <p className="fs-18 fw-400 text-secondary-500">
                                  {/* 這裡可以加上 slice 控制字數，避免內文太長撐破版面 */}
                                  {newsContent?.length > 50 ? `${newsContent.slice(0, 50)}...` : newsContent}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : null;
                      })}
        </div>
      </div>
 

    </div>
  );
}

export default AnimalTracking;