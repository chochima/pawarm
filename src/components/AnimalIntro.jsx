// AnimalIntro.jsx
import waveDown from '../image/track-img/wave-down.png';
import waveUp from '../image/track-img/wave-up.png';

// 我們把需要的資料 (currentAnimal) 透過 props 傳進來
function AnimalIntro({ currentAnimal }) {
  // 如果資料還沒抓到，先不渲染，避免報錯
  if (!currentAnimal || !currentAnimal.title) return null;

  return (

    <div className="overflow-hidden">
        <img src={waveUp} alt="wave-up" className='w-100 d-block'/>
        <div className='bg-secondary-50 py-120 '>
            <div className='container px-12 px-xl-0 '>
            {/* 1. 這裡改成 currentAnimal */}
            <p className='text-serif fs-48 title-underline' >{currentAnimal?.title}介紹</p>
            
            <div className='row g-48 px-xxl-0 px-12 d-flex '>
                {/* 2. 使用迴圈產出三欄內容 */}
                {[1, 2, 3].map((num) => (
                <div className="col-xl-4 d-flex flex-column" key={num}>
                    <img 
                    src={currentAnimal?.[`image_${num}`]} 
                    alt={`description-${num}`} 
                    className='w-100 description-img-max mx-auto mx-xl-0'
                    />
                    <h4 className='fw-700 fs-24 text-secondary-900 pt-8'>
                    {currentAnimal?.[`subject_${num}`]}
                    </h4>
                    <p className='fw-500 fs-20 text-secondary-500'>
                    {currentAnimal?.[`content_${num}`]}
                    </p>   
                </div>
                ))}
            </div>
            </div>
        </div>
        <img src={waveDown} alt="wave-down" className='w-100 d-block' />
    </div>
  );
}

export default AnimalIntro;