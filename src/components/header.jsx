
import { useSelector , useDispatch} from "react-redux";
import { useEffect } from "react";
import { NavLink ,Outlet} from "react-router"
import { createAsyncGetCart } from "../slice/cartSlice";
import HeaderMobile from "./header-mobile";

import logoPawarm from "../assets/images/pawarm.svg";
import iconLogin from "../image/icon-login.png";
import iconCart from"../image/type=cart.png";



export default function Header() {
    
    const carts= useSelector(state=>state.cart.carts)
    const cartCount = carts?.reduce((acc, cur) => acc + (cur.qty || 0), 0) || 0;
    const dispatch=useDispatch()
    
    useEffect(()=>{
        dispatch(createAsyncGetCart())
    },[dispatch])


return (
<>
<div className="container text-sans">
<div className="row header-style">

<div className="container">
<div className="row">
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
            <li><NavLink href="#">查看公益里程碑</NavLink></li>
            <li><NavLink to='animaltracking'>追蹤​動物​​​​</NavLink></li>
            <li><NavLink href="#">活動資訊​​​</NavLink></li>
            <li><NavLink href="#">關於我們​​​​</NavLink></li>
            <li className="border-start border border-secondary-1 border-1 me-48"></li>
            
        </ul>
        </div>
        }

        {   //登入
        <div className="col-auto px-0 nav-content">
            <span className="header-login">
                <img src={iconLogin} alt="登入icon" />
                <NavLink to="login">登入</NavLink>
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