import React from "react";
import { useSelector , useDispatch} from "react-redux";
import { NavLink ,Outlet} from "react-router"

import logoPawarm from "../assets/images/pawarm.svg";

const { useState } = React;
export default function Footer() {

  return (


<div className="bg-secondary-50 py-48 py-md-100">
  <div className="container text-sans gap-48">
  <div className="row">

    <div className="col-12 col-md-6 px-md-0 footer-style">
      <h1><NavLink to="/"><img src={logoPawarm} alt="pawarm LOGO" /></NavLink></h1>
      
      <div className="col align-self-center ps-0 pe-0 pb-48 footer-style">
        <ul className="footer-content ps-0 gap-16 d-flex flex-column flex-md-row">
          <li><NavLink to='products'>選擇​我​的​動物​​​</NavLink></li>
          <li><NavLink to="milestone">查看公益里程碑</NavLink></li>
          <li><NavLink to='animaltracking'>追蹤​動物​</NavLink></li>
          <li><NavLink to="#">活動資訊​​​</NavLink></li>
          <li><NavLink to="#">關於我們​​​​</NavLink></li>
        </ul>

        <ul className="nav-icon px-0 gap-8 gap-md-12">
          <li><a href="#"><svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="currentcolor" d="M32 1C14.8 1 1 14.8 1 32s13.8 31 31 31s31-13.8 31-31S49.2 1 32 1m8.2 18.9h-3.1c-1.4 0-2.3.7-2.3 2c-.1 1.1 0 2.3 0 3.2c0 .4.1.4.4.4h4.6c.4 0 .6.1.6.6c-.1 1.8-.4 3.7-.4 5.5c0 .4-.1.4-.6.4h-3.7c-.8 0-.7-.1-.7.7v17.1c0 .6-.1.7-.7.7H28c-.6 0-.7-.1-.7-.7V32.5c0-.4-.1-.7-.6-.6H24c-.6.3-.6.1-.6-.3v-5.5c0-.4.1-.4.4-.4h2.8c.6 0 .7-.1.7-.7v-4.2c0-1.7.4-3.2 1.4-4.6c1.3-1.7 3.1-2.5 5.1-2.7c2.1-.1 4.2 0 6.3-.1c.3 0 .4.1.4.4v5.5q.15.6-.3.6"/></svg>​​</a></li>

          <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24"><path fill="currentcolor" d="M13.61 12.243a1.6 1.6 0 1 1-1.56-1.63a1.62 1.62 0 0 1 1.56 1.63"/><path fill="currentcolor" d="M14.763 7.233H9.338a2.024 2.024 0 0 0-2.024 2.024v5.547a2.024 2.024 0 0 0 2.024 2.024h5.425a2.024 2.024 0 0 0 2.024-2.024V9.267a2.026 2.026 0 0 0-2.024-2.034m-2.713 7.723a2.703 2.703 0 1 1 2.642-2.703a2.672 2.672 0 0 1-2.642 2.703m2.936-5.405a.496.496 0 0 1-.496-.506a.506.506 0 1 1 1.012 0a.496.496 0 0 1-.557.506z"/><path fill="currentcolor" d="M12.05 2a10 10 0 1 0-.1 20a10 10 0 0 0 .1-20m6.073 12.702a3.39 3.39 0 0 1-3.41 3.411H9.389a3.392 3.392 0 0 1-3.411-3.41V9.378a3.39 3.39 0 0 1 3.41-3.411h5.325a3.39 3.39 0 0 1 3.41 3.41z"/></svg>​</a></li>
    
          <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32"><path fill="currentcolor" d="M16 .396c-8.839 0-16 7.167-16 16c0 7.073 4.584 13.068 10.937 15.183c.803.151 1.093-.344 1.093-.772c0-.38-.009-1.385-.015-2.719c-4.453.964-5.391-2.151-5.391-2.151c-.729-1.844-1.781-2.339-1.781-2.339c-1.448-.989.115-.968.115-.968c1.604.109 2.448 1.645 2.448 1.645c1.427 2.448 3.744 1.74 4.661 1.328c.14-1.031.557-1.74 1.011-2.135c-3.552-.401-7.287-1.776-7.287-7.907c0-1.751.62-3.177 1.645-4.297c-.177-.401-.719-2.031.141-4.235c0 0 1.339-.427 4.4 1.641a15.436 15.436 0 0 1 4-.541c1.36.009 2.719.187 4 .541c3.043-2.068 4.381-1.641 4.381-1.641c.859 2.204.317 3.833.161 4.235c1.015 1.12 1.635 2.547 1.635 4.297c0 6.145-3.74 7.5-7.296 7.891c.556.479 1.077 1.464 1.077 2.959c0 2.14-.02 3.864-.02 4.385c0 .416.28.916 1.104.755c6.4-2.093 10.979-8.093 10.979-15.156c0-8.833-7.161-16-16-16z"/></svg>​</a></li>
          
        </ul>
      </div>
    </div>
    

    <div className="col col-md-6 px-md-0">
      <h2 className="fw-700 mb-20">訂閱電子報</h2>
      <div className="d-flex flex-column flex-md-row mb-3 email-input">
        <input type="email" className="form-control fw-500 eNews" id="eNewsLetterEmail" aria-describedby="inputENewsLetterEmail" placeholder="請輸入 E-mail"/>
        <button className="btn btn-primary-500 px-md-44 py-md-16 text-nowrap eNews" type="button" id="sub-button">訂閱</button>
      </div>
    </div>


    <div className="copyright">
      <p className="">Copyright ©​ 2025 Pawarm |​ 本​網站​僅供個人​作品​使用，​不​提供​商​業用​途</p>
    </div>
  
  </div>
  </div>
</div>

  )
}