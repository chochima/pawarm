import { NavLink } from 'react-router-dom';

const MechanismLogos = ({ mechanismImages = [] }) => {
  return (
    <div>
      <div className="container">
        <div className="py-120 overflow-x-hidden">
          {/* 標題 */}
          <div className="fs-36 fw-700 title-text-cart text-black mb-32">
            瀏覽更多保育機構
          </div>

          <div className="row">
            {/* 左側 Logo 區域：維持 col-lg-9 比例 */}
            <div className="col-lg-9 col-12">
              <div className="row g-20 g-md-32 align-items-center">
                {(mechanismImages || []).map((item, index) => (
                  <div className="col-6 col-lg-3" key={index}>
                    <NavLink className="logo-wrapper d-flex justify-content-center align-items-center">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name}
                        className="img-fluid partner-logo" 
                        style={{ maxHeight: '80px', width: 'auto', objectFit: 'contain' }}
                      />
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>

            {/* 右側留白區域：維持桌機版佔位 */}
            <div className="d-none d-lg-block col-lg-3">
              {/* 這裡保留原始結構中的空區域 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MechanismLogos;