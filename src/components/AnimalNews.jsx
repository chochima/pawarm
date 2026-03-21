// AnimalNews.jsx
import React from 'react';

function AnimalNews({ currentAnimal, currentAssoIndex }) {
  // 防禦性檢查：如果沒有資料就先不渲染
  if (!currentAnimal) return null;

  return (
    <div className='container pt-32 px-12 px-lg-0 pb-48 pb-lg-120'>
      <div className="row gx-20 gy-20 gx-lg-48 gy-lg-48">
        {[1, 2, 3, 4].map((num) => {
          const newsDate = currentAnimal[`newsDate_${currentAssoIndex}_${num}`];
          const newsSubject = currentAnimal[`newsSubject_${currentAssoIndex}_${num}`];
          const newsContent = currentAnimal[`newsContent_${currentAssoIndex}_${num}`];
          const newsImg = currentAnimal[`newsImg_${currentAssoIndex}_${num}`];
          const newsHref = currentAnimal[`newshref_${currentAssoIndex}_${num}`];

          return newsSubject ? (
            <div className="col-lg-6" key={num}>
              <div className="d-flex align-items-center justify-content-start shadow rounded bg-secondary-50 h-100">
                <a 
                  href={newsHref}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="d-flex align-items-center justify-content-start shadow rounded bg-secondary-50 h-100 text-decoration-none" 
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={newsImg} 
                    alt={newsSubject} 
                    className="Asso-size object-fit-cover"
                    style={{ width: '240px', height: '240px', flexShrink: 0 }}
                  />
                  <div className='px-12 py-12 px-lg-36'>
                    <p className="mb-12 text-secondary-300 fw-400 fs-16">{newsDate}</p>
                    <p className="fw-bold mb-12 text-secondary-900 fs-20">{newsSubject}</p>
                    <p className="fs-18 fw-400 text-secondary-500">
                      {newsContent?.length > 50 ? `${newsContent.slice(0, 50)}...` : newsContent}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

export default AnimalNews;