import React from "react";

const { useState } = React;
export default function Header() {

  return (

<div className="container text-sans">
    <div className="row header-style">

        <div className="col-auto p-0">
        <a href="#"><img src="/pawarm.svg" alt="pawarm LOGO" /></a>
        </div>

    <div className="col align-self-center ps-0 pe-0">
        <ul className="nav-content">
            <li><a href="#">選擇​我​的​動物​​​</a></li>
            <li><a href="#">查看保育組織​​</a></li>
            <li><a href="#">追蹤​動物​​</a></li>
            <li><a href="#">活動資訊​​</a></li>
            <li><a href="#">關於我們​​</a></li>
            <li className="border-start border border-secondary-1 border-1"></li>
            <li><a className="" href="#">登入</a></li>
            <li><a href="#"><svg className="pb-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="currentcolor" d="M14 13.1V12H4.6l.6-1.1l9.2-.9L16 4H3.7L3 1H0v1h2.2l2.1 8.4L3 13v1.5c0 .8.7 1.5 1.5 1.5S6 15.3 6 14.5S5.3 13 4.5 13H12v1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-.7-.4-1.2-1-1.4z"/></svg></a></li>
        </ul>
    </div>

    </div>
</div>

  )
}