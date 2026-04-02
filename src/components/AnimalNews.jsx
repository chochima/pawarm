// AnimalNews.jsx

function AnimalNews({ currentAnimal, currentAssoIndex }) {
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
              {/* 🚩 重點：外層 a 標籤改為 flex-column (手機直排) 與 flex-lg-row (大螢幕橫排) */}
              <a 
                href={newsHref}
                target="_blank" 
                rel="noopener noreferrer" 
                className="d-flex flex-column flex-lg-row align-items-stretch shadow rounded bg-secondary-50 h-100 text-decoration-none overflow-hidden" 
                style={{ cursor: 'pointer' }}
              >
                {/* 圖片容器：手機版寬度 100%，電腦版固定 240px */}
                <div className="flex-shrink-0">
                  <img
                    src={newsImg} 
                    alt={newsSubject} 
                    className="object-fit-cover w-100"
                    style={{ 
                      height: '240px', 
                      width: '100%',     // 手機版自動全寬
                      maxWidth: '100%' 
                    }}
                  />
                </div>

                {/* 文字區塊 */}
                <div className='px-20 py-20 px-lg-32 d-flex flex-column justify-content-center'>
                  <p className="mb-8 text-secondary-300 fw-400 fs-14 fs-lg-16">{newsDate}</p>
                  <p className="fw-bold mb-12 text-secondary-900 fs-18 fs-lg-20 lh-sm">{newsSubject}</p>
                  <p className="fs-16 fs-lg-18 fw-400 text-secondary-500 mb-0">
                    {newsContent?.length > 45 ? `${newsContent.slice(0, 45)}...` : newsContent}
                  </p>
                </div>
              </a>
            </div>
          ) : null;
        })}
      </div>
      
      {/* 內嵌一個針對桌機版圖片寬度的 CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 992px) {
          .flex-lg-row img {
            width: 240px !important;
            height: 100% !important;
          }
        }
      `}} />
    </div>
  );
}

export default AnimalNews;