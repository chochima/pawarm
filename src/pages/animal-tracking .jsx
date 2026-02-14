import React from 'react';

import '../style/_fonts.scss';
import '../style/_animal-tracking.scss';

function AnimalTracking() {
  return (
    <div className="animal-tracking-page">
      <section className="pt-120 container px-0">
        <h1 className='text-serif title-underline' >我守護的動物們</h1>
      </section>
      <section className="py-32 container px-0">
        <button className=' me-24 py-8 px-24 text-sans bg-gray-50 text-gray-900 border-0'>臺灣石虎</button>
        <button className=' me-24 py-8 px-24 text-sans bg-gray-50 text-gray-900 border-0'>臺灣梅花鹿</button>
        <button className=' me-24 py-8 px-24 text-sans bg-gray-50 text-gray-900 border-0'>非洲穿山甲</button>
        <button className=' me-24 py-8 px-24 text-sans bg-gray-50 text-gray-900 border-0'>臺灣獼猴</button>
        <button className=' me-24 py-8 px-24 text-sans bg-gray-50 text-gray-900 border-0'>歐亞水獺</button>
        <button className=' me-24 py-8 px-24 text-sans bg-gray-50 text-gray-900 border-0'>台灣黑熊</button>
      </section>
      <section className='container d-flex position-relative pb-120'>
        <img src="src\image\track-img\tracking-Leopard-Cat.png" alt="Leopard-Cat" />
        <img src="src\image\track-img\guradAnimal.png" className='position-absolute photo-position' alt="" />
      </section>
      <section className="pt-120 px-0 container d-flex justify-content-between ">
        <p className='text-serif fs-48 title-underline' >台灣石虎移動路徑</p>
        <p className='mt-auto fs-20 text-secondary'><img src="src\image\love.svg" alt="" className='love-size'/>20000人追蹤中</p>
      </section>
      <section className='d-flex justify-content-center mt-32 pb-120'>
        <img src="src\image\track-img\trank-map.png" alt="" />
      </section>
      <section>
        <img src="src\image\track-img\wave-up.png" alt="wave-up" />
        <div className='bg-secondary-50 py-120 '>
          <div className='container test-border px-0'>
            <p className='text-serif fs-48 title-underline' >台灣石虎移動路徑</p>
            <div className='row g-48'>
              <div className="col-4">
                <img src="src\image\track-img\leopard-cat-description-1.png" alt="leopard-cat-description-1" />
                <h4 className='fw-700 fs-24 text-secondary-900'>隱身林間​的​「小​豹子」​</h4>
                <p className='fw-500 fs-20 text-secondary-500'>​在​台灣​低海拔​丘陵，​藏著​一​位​額頭​有​兩道​白線、​全身​披著迷彩​斑點​的​小獵​人​——​石虎。​牠們​體型​雖與​家​貓​相仿，​卻​更​為​修長​矯健。​當地​人​稱牠為​「山貓」​或​「台灣​花豹」，​那​雙​炯炯​有神​的​眼睛，​總​是​在​夜色​中閃爍​著野性​的​光芒，​守護​著這片​土地。​</p>   
              </div>
              <div className="col-4">
                <img src="src\image\track-img\leopard-cat-description-2.png" alt="leopard-cat-description-2" />
                <h4 className='fw-700 fs-24 text-secondary-900'>淺山​秘境​的​夜行者​</h4>
                <p className='fw-500 fs-20 text-secondary-500'>每​當​夜幕​降臨，​石虎​便從苗栗、​台中​或​南投​的​灌木林​中​現身。​牠們​偏好​在​ 1​500 ​公尺​以下​的​農地​與​水源​地​活動，​這裡既​是​牠們​的​遊戲場，​也​是​獵場。​儘管​牠們​避開​人群，​但​為​了​填飽​肚子，​這群​神祕​的​夜行者​偶爾​也​會穿梭​在​果園​與​草叢間，​與人​類​共​享這​片​山林。​</p>
              </div>
              <div className="col-4">
                <img src="src\image\track-img\leopard-cat-description-3.png" alt="leopard-cat-description-3" />
                <h4 className='fw-700 fs-24 text-secondary-900'>​獨來​獨往​的​攀爬​高手</h4>
                <p className='fw-500 fs-20 text-secondary-500'>石虎​是​天生​的​孤獨​旅行者，​除了​交配​期​外，​總愛​單​獨​行動。​牠們​不​僅擅長​奔跑，​更​是​爬樹​高手，​尾巴​上​的​黑環紋​是​牠們​的​標誌。​這群​專​業獵人​以​鼠類​和​鳥類​為​主食，​雖然​偶爾會因捕食雞隻與農民產生​小​摩擦，​但​牠們​的​存在，​正​是​生態​環境​健康​的​最佳​證明。​</p>
              </div>
            </div>
        </div>
        </div>
        <img src="src\image\track-img\wave-down.png" alt="wave-up" />
      </section>
      <section className="pt-120 container px-0">
        <p className='text-serif fs-48 title-underline' >臺灣石虎保育機構</p>
      </section>
      <section className="pt-32 pb-120 container px-0 ">
        <button className=' me-24 py-8 px-24 text-sans bg-gray-50 text-gray-900 border-0'>臺灣石虎保育協會</button>
        <button className=' me-24 py-8 px-24 text-sans bg-gray-50 text-gray-900 border-0'>荒野保育協會</button>
        <button className=' me-24 py-8 px-24 text-sans bg-gray-50 text-gray-900 border-0'>阿虎加油！石虎保育大使</button>
        <button className=' me-24 py-8 px-24 text-sans bg-gray-50 text-gray-900 border-0'>台北市立動物園</button>
        <div className=' height-360 mt-32 px-48'>
          <div className='row h-100 g-0 d-flex justify-content-center align-items-center'>
            <div className="col-6 d-flex justify-content-center">
              <img src="src/image/track-img/leopard-cat-conservation-logo.png" alt="logo" />
            </div>
            <div className="col-6">
              <h4 className='text-gray-900 fw-700 fs-24 mb-16'>臺灣石虎保育協會</h4>
              <p className='fw-500 fs-20 text-secondary-500 mb-0'>
                協會積極推動在台灣面臨瀕危的一級保育類野生動物-石虎之保育和研究，
                期望能提升國人對於石虎之認識和關切，並號召民眾一起為石虎保育工作努力，
                也期望未來能藉由國際交流和合作，與亞洲其他國家分享的小型貓科動物-石虎相關的研究經驗。
              </p>
            </div>
          </div>
        </div>
        <div>
        <div className="row g-48">
          <div className="col-6">
            <div className="d-flex align-items-center  height-240 ">
              <img
                src="src/image/track-img/leopard-cat-conservation-logo-240.png"
                alt="conservation-1"
                className="photo-size-240 me-24"
              />
              <div>
                <p className="mb-12 text-secondary-300 fw-400 fs-16">2025 年 12 月 15 日</p>
                <p className="fw-bold mb-12 text-secondary-900 fs-20">臺灣石虎保育協會 11 月工作報告 & 捐款徵信</p>
                <p className="fs-18 fw-400 text-secondary-500">感謝虎友們對石虎的關心與支持，馬上來看看協會 11 月的工作成果吧！</p>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="d-flex align-items-center  height-240 ">
              <img
                src="src/image/track-img/leopard-cat-conservation-news-2.png"
                alt="conservation-2"
                className="photo-size-240 me-24"
              />
              <div>
                <p className="mb-12 text-secondary-300 fw-400 fs-16">2025 年 12 月 1 日</p>
                <p className="fw-bold mb-12 text-secondary-900 fs-20">石虎 × 臺灣白海豚 保育｜新春公益捐款回饋</p>
                <p className="fs-18 fw-400 text-secondary-500">捐款 285 元，領取限量春聯與紅包袋，包個別具意義的紅包給石虎與牠的好朋友吧！</p>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="d-flex align-items-center  height-240 ">
              <img
                src="src/image/track-img/leopard-cat-conservation-news-3.png"
                alt="conservation-3"
                className="photo-size-240 me-24"
              />
              <div>
                <p className="mb-12 text-secondary-300 fw-400 fs-16">2025 年 11 月 15 日</p>
                <p className="fw-bold mb-12 text-secondary-900 fs-20">對野生動物友善的標章 & 它的產地</p>
                <p className="fs-18 fw-400 text-secondary-500">近日「友善石虎農作標章」走進大眾視野，相信虎友們一定摩拳擦掌，想用新台幣支持友善農作。</p>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="d-flex align-items-center  height-240 ">
              <img
                src="src/image/track-img/leopard-cat-conservation-news-4.png"
                alt="conservation-4"
                className="photo-size-240 me-24"
              />
              <div>
                <p className="mb-12 text-secondary-300 fw-400 fs-16">2025 年 10 月 27 日</p>
                <p className="fw-bold mb-12 text-secondary-900 fs-20">石虎重要廊道植被遭清空？！</p>
                <p className="fs-18 fw-400 text-secondary-500">50 隻以上的石虎會利用的重要環境——苗栗後龍溪至西湖溪的高灘地，整片植被遭清理一空😱</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

    </div>
  );
}

export default AnimalTracking;