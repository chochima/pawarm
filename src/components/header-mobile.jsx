import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { createAsyncGetCart } from "../slice/cartSlice";
import logo from "../assets/images/pawarm.svg"; 
import iconLogin from "../image/icon-login.png";
import iconUser from "../image/icon-user.png";

function HeaderMobile({ className }) {
  const isAuth = useSelector((state) => state.auth?.token);
  
  const closeMenu = () => {
    const collapseEl = document.getElementById('headerCollapse');
    const bsCollapse = window.bootstrap?.Collapse?.getInstance(collapseEl);
    if (bsCollapse) bsCollapse.hide();
  };

  const carts = useSelector(state => state.cart.carts);
  const cartCount = carts?.reduce((acc, cur) => acc + (cur.qty || 0), 0) || 0;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createAsyncGetCart());
  }, [dispatch]);

  return (
    <div className={className}> 
      <div className="container-fluid px-0">
        
        {/* 行動版導覽列核心區 */}
        <div className="row mx-0 align-items-center py-2 border-bottom">
          
          {/* 左側：漢堡選單按鈕 */}
          <div className="col-auto px-0">
            <button 
              className="btn px-2 py-0" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#headerCollapse" 
              aria-expanded="false" 
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 16 16">
                <path fill="#3D3D3D" fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
          </div>

          {/* 中間：Logo 品牌識別 */}
          <div className="col text-center">
            <NavLink to="/" onClick={closeMenu}>
              <img src={logo} alt="品牌Logo" style={{ maxHeight: '40px', width: 'auto' }} />
            </NavLink>
          </div>

          {/* 右側：登入與購物車 */}
          <div className="col-auto px-0 d-flex align-items-center">
            <span className="header-login me-2">
              {isAuth ? (
                <NavLink to="membercenter" className="text-decoration-none">
                  <img src={iconUser} alt="會員中心" width="24" />
                </NavLink>
              ) : (
                <NavLink to="login" className="text-decoration-none">
                  <img src={iconLogin} alt="登入" width="24" />
                </NavLink>
              )}
            </span>
            
            <NavLink to="carts" className="position-relative d-inline-block px-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                <path fill="#3D3D3D" d="M14 13.1V12H4.6l.6-1.1l9.2-.9L16 4H3.7L3 1H0v1h2.2l2.1 8.4L3 13v1.5c0 .8.7 1.5 1.5 1.5S6 15.3 6 14.5S5.3 13 4.5 13H12v1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-.7-.4-1.2-1-1.4z"/>
              </svg>
              {cartCount > 0 && (
                <span 
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: '0.6rem' }}
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </NavLink>
          </div> 
        </div>

        {/* 下拉選單內容 */}
        <div className="row mx-0">
          <div className="col px-0">
            <div className="collapse" id="headerCollapse">
              <div className="card card-body border-0 rounded-0 px-0 py-0">
                <ul className="nav-content-mob list-unstyled mb-0">
                  <li className="border-bottom"><NavLink className="d-block py-3 px-4 text-decoration-none text-dark" to='products' onClick={closeMenu}>選擇我的動物</NavLink></li>
                  <li className="border-bottom"><NavLink className="d-block py-3 px-4 text-decoration-none text-dark" to="milestone" onClick={closeMenu}>查看公益里程碑</NavLink></li>
                  <li className="border-bottom"><NavLink className="d-block py-3 px-4 text-decoration-none text-dark" to='animaltracking' onClick={closeMenu}>追蹤動物</NavLink></li>
                  <li className="border-bottom"><NavLink className="d-block py-3 px-4 text-decoration-none text-dark" to='events' onClick={closeMenu}>活動資訊</NavLink></li>
                  <li><NavLink className="d-block py-3 px-4 text-decoration-none text-dark" to='about' onClick={closeMenu}>關於我們</NavLink></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 遮罩 */}
        <div className="menu-overlay" onClick={closeMenu}></div>
      </div>
    </div>
  );
}

export default HeaderMobile;