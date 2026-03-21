// AnimalAsso.jsx
import React from 'react';

function AnimalAsso({ currentAnimal, currentAssoIndex, setCurrentAssoIndex }) {
  if (!currentAnimal) return null;

  return (
    <>
      <div className="pt-120 container px-12 px-xl-0">
        <p className='text-serif fs-48 title-underline' >
          {currentAnimal?.title}保育機構
        </p>
      </div>
      <div className="pt-32 container px-12 px-xl-0">
        <div className='d-flex flex-nowrap overflow-x-auto pb-2 hide-scrollbar'>
          {[1, 2, 3].map((num) => {
            const name = currentAnimal?.[`assoName_${num}`];
            return name ? (
              <button 
                key={num}
                className={`btn flex-shrink-0 me-24 py-8 px-24 text-sans border-0 
                  ${currentAssoIndex === num ? 'btn-filled-active text-gray-900' : 'btn-secondary-50 text-gray-500'}`}
                onClick={() => setCurrentAssoIndex(num)}
              >
                {name}
              </button>
            ) : null;
          })}
        </div>
        
        <div className='height-360 mt-32 px-48'>
          <div className='row h-100 d-flex justify-content-center align-items-center'>
            <div className="col-lg-6 d-flex justify-content-center">
              <a href={currentAnimal?.[`assohref_${currentAssoIndex}`]} target="_blank" rel="noopener noreferrer" className="d-block">
                <img 
                  src={currentAnimal?.[`assoImg_${currentAssoIndex}`]} 
                  className="img-fluid" 
                  alt={currentAnimal?.[`assoName_${currentAssoIndex}`] || "logo"} 
                />
              </a>
            </div>
            <div className="col-lg-6">
              <h4 className='text-gray-900 fw-700 fs-24 mb-16'>
                {currentAnimal?.[`assoName_${currentAssoIndex}`]}
              </h4>
              <p className='fw-500 fs-20 text-secondary-500 mb-0'>
                {currentAnimal?.[`assoSubject_${currentAssoIndex}`]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnimalAsso;