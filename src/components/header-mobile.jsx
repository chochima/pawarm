import React from "react";
import { useSelector , useDispatch} from "react-redux";
import { NavLink ,Outlet} from "react-router"

import iconLogin from "../image/icon-login.png";
{/*遮罩待補*/}

function HeaderMobile({ className }) {
    const closeMenu = () => {
        const collapseEl = document.getElementById('headerCollapse');

        const bsCollapse = Collapse.getInstance(collapseEl);
        if (bsCollapse) bsCollapse.hide();
    };

return (<div className= "{ className }">

<div className="px-0 py-0">

<div className="row mx-0 mb-0 py-24">
    {   //漢堡ICON
    <div className="col px-0">
        <button className="btn px-0 py-0" type="button" data-bs-toggle="collapse" data-bs-target="#headerCollapse" aria-expanded="false" aria-controls="headerCollapse">
            <svg className="mx-8 my-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="#3D3D3D" fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg>
        </button>
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
                </NavLink>
            </span>  
    </div> 
    }

</div>

<div className="row">
<div className="col px-0">

    <div className="collapse" id="headerCollapse">
    <div className="card card-body px-0 py-0">

        {  //中間NAV
        <ul className="nav-content-mob">
            <li><NavLink to='products'>選擇​我​的​動物​​​</NavLink></li>
            <li><NavLink href="#">查看公益里程碑</NavLink></li>
            <li><NavLink to='animaltracking'>追蹤​動物​​​​</NavLink></li>
            <li><NavLink href="#">活動資訊​​​</NavLink></li>
            <li><NavLink href="#">關於我們​​​​</NavLink></li>
        </ul>
        }

    </div>
    </div>  

</div>
</div>

{ //遮罩 
<div className="menu-overlay" onClick={closeMenu}></div>
}

</div>






</div>)}
export default HeaderMobile