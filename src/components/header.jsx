
import { useSelector , useDispatch} from "react-redux";
import { useEffect } from "react";
import { NavLink ,Outlet} from "react-router"
import { createAsyncGetCart } from "../slice/cartSlice";
import { setToken } from "../slice/authSlice";
import HeaderMobile from "./header-mobile";

import logoPawarm from "../assets/images/pawarm.svg";
import iconLogin from "../image/icon-login.png";
import iconUser from "../image/icon-user.png";
import iconCart from"../image/type=cart.png";



export default function Header() {
    
    const carts= useSelector(state=>state.cart.carts)
    const cartCount = carts?.reduce((acc, cur) => acc + (cur.qty || 0), 0) || 0;
    const dispatch=useDispatch()

    const isAuth = useSelector((state) => state.auth?.token);
    
    useEffect(() => {
        dispatch(createAsyncGetCart())
        const token = document.cookie.replace(
             /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
             "$1"
            );
  
  
  if (token && !isAuth) {
    dispatch(setToken(token));
  }
}, [dispatch, isAuth]);


return (
<>
<div className="container text-sans">
<div className="row header-style">

<div className="container">
<div className="row justify-content-between align-items-center">
    {/*漢堡選單*/}
        <div className="d-block d-xl-none">
            <HeaderMobile/>
        </div>
    
    {   //LOGO
    <div className="col-auto">
        <NavLink to='/'><img className="d-none d-xl-block" src={logoPawarm} alt="pawarm LOGO" /></NavLink>
    </div> 
    }

    {   //nav + login
    <div className="col-auto d-none d-xl-block">
    <div className="row  justify-content-end">

        {   //中間NAV
        <div className="col-auto px-0 align-self-center">
        <ul className="nav-content">
            <li><NavLink to='products'>選擇​我​的​動物​​​</NavLink></li>
            <li><NavLink to="milestone">查看公益里程碑</NavLink></li>
            <li><NavLink to='animaltracking'>追蹤​動物​​​​</NavLink></li>
            <li><NavLink to='events'>活動資訊​​​</NavLink></li>
            <li><NavLink to='about'>關於我們​​​​</NavLink></li>
            <li className="border-start border border-secondary-1 border-1 me-48"></li>
        </ul>
        </div>
        }

        {   //登入
        <div className="col-auto  nav-content">
            <span className="header-login me-3">
      {isAuth ? (
        <NavLink to="membercenter" className="d-flex align-items-center text-decoration-none text-dark">
          <img src={iconUser} alt="會員中心" />
          <span className="ms-1">Tina Liu</span>
        </NavLink>
      ) : (
        <NavLink to="login" className="d-flex align-items-center text-decoration-none text-dark">
          <img src={iconLogin} alt="登入icon" />
          <span className="ms-1">登入</span>
        </NavLink>
      )}
    </span>
            
            <span>
                <NavLink to="carts" className="position-relative d-inline-block text-decoration-none">
                    <img src={iconCart} alt="iconCart" />

                    {cartCount > 0 && (
                        <span 
                            className="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger"
                            style={{ fontSize: '0.65rem', padding: '0.25em 0.45em' }}>

                            {cartCount > 99 ? '99+' : cartCount}
                            <span className="visually-hidden">未讀商品</span>
                        </span>
                    )}

                </NavLink>
            </span>  
        </div> 
        }

    </div>
    </div>

    }

    






    


</div>
</div>


</div>
</div>

</>
)
}