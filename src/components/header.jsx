import React from "react";
import { useSelector , useDispatch} from "react-redux";
import { NavLink ,Outlet} from "react-router"
import HeaderMobile from "./header-mobile";

import logoPawarm from "../assets/images/pawarm.svg";
import iconLogin from "../image/icon-login.png";


const { useState } = React;
export default function Header() {
    {/*
    const carts= useSelector(state=>state.cart.carts)
    const cartCount = carts?.reduce((acc, cur) => acc + (cur.qty || 0), 0) || 0;
    const dispatch=useDispatch()
    
    useEffect(()=>{
        dispatch(createAsyncGetCart())
    },[dispatch])
*/}

return (
<>
<div className="container text-sans">
<div className="row header-style">

<div className="container">
<div className="row">
    {/*漢堡選單*/}
        <div className="d-block d-md-none">
            <HeaderMobile/>
        </div>
    
    {   //LOGO
    <div className="col-auto">
        <NavLink to='/'><img className="d-none d-md-block" src={logoPawarm} alt="pawarm LOGO" /></NavLink>
    </div> 
    }

    {   //nav + login
    <div className="col d-none d-md-block">
    <div className="row  justify-content-end">

        {   //中間NAV
        <div className="col-auto px-0 align-self-center">
        <ul className="nav-content">
            <li><NavLink to='products'>選擇​我​的​動物​​​</NavLink></li>
            <li><NavLink to="milestone">查看公益里程碑</NavLink></li>
            <li><NavLink to='animaltracking'>追蹤​動物​​​​</NavLink></li>
            <li><NavLink to="#">活動資訊​​​</NavLink></li>
            <li><NavLink to="#">關於我們​​​​</NavLink></li>
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
                    <svg className="mx-8 my-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="currentcolor" d="M14 13.1V12H4.6l.6-1.1l9.2-.9L16 4H3.7L3 1H0v1h2.2l2.1 8.4L3 13v1.5c0 .8.7 1.5 1.5 1.5S6 15.3 6 14.5S5.3 13 4.5 13H12v1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-.7-.4-1.2-1-1.4z"/></svg>
{/*
                    {cartCount > 0 && (
                        <span 
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            style={{ fontSize: '0.65rem', padding: '0.25em 0.45em' }}>

                            {cartCount > 99 ? '99+' : cartCount}
                            <span className="visually-hidden">未讀商品</span>
                        </span>
                    )}
*/}
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