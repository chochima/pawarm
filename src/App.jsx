import { NavLink ,Outlet} from "react-router"


function App() {

  return (
    <>
    <div className="container text-sans">
    <div className="row header-style">

        <div className="col-auto p-0">
        <NavLink to='/'><img src="/pawarm.svg" alt="pawarm LOGO" /></NavLink>
        </div>

    <div className="col align-self-center ps-0 pe-0">
        <ul className="nav-content">
            <li><NavLink to='products'>選擇​我​的​動物​​​</NavLink></li>
            <li><NavLink href="#">查看保育組織​​</NavLink></li>
            <li><NavLink href="#">追蹤​動物​​</NavLink></li>
            <li><NavLink href="#">活動資訊​​</NavLink></li>
            <li><NavLink href="#">關於我們​​</NavLink></li>
            <li className="border-start border border-secondary-1 border-1"></li>
            <li><NavLink className="" href="#">登入</NavLink></li>
            <li><NavLink href="#"><svg className="pb-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="currentcolor" d="M14 13.1V12H4.6l.6-1.1l9.2-.9L16 4H3.7L3 1H0v1h2.2l2.1 8.4L3 13v1.5c0 .8.7 1.5 1.5 1.5S6 15.3 6 14.5S5.3 13 4.5 13H12v1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-.7-.4-1.2-1-1.4z"/></svg></NavLink></li>
        </ul>
    </div>

    </div>
</div>
     
     <Outlet/>


     <div className="bg-secondary-50 py-100">
  <div className="container text-sans gap-48 ">
  <div className="row">

    <div className="col-6 p-0 footer-style">
      <h1><NavLink href="#"><img src="/pawarm.svg" alt="pawarm LOGO" /></NavLink></h1>
      
      <div className="col align-self-center ps-0 pe-0 pb-48 footer-style">
        <ul className="nav-content ps-0 gap-16">
          <li><NavLink className="" href="#">​我​的​動物​​​</NavLink></li>
          <li><NavLink href="#">查看組織​​</NavLink></li>
          <li><NavLink href="#">常見問題​​</NavLink></li>
          <li><NavLink href="#">關於我們​​</NavLink></li>
          <li><NavLink href="#">聯絡我們​​</NavLink></li>
        </ul>

        <ul className="nav-content nav-media-logo ps-8 gap-12">
          <li><NavLink href="#"><svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="currentcolor" d="M32 1C14.8 1 1 14.8 1 32s13.8 31 31 31s31-13.8 31-31S49.2 1 32 1m8.2 18.9h-3.1c-1.4 0-2.3.7-2.3 2c-.1 1.1 0 2.3 0 3.2c0 .4.1.4.4.4h4.6c.4 0 .6.1.6.6c-.1 1.8-.4 3.7-.4 5.5c0 .4-.1.4-.6.4h-3.7c-.8 0-.7-.1-.7.7v17.1c0 .6-.1.7-.7.7H28c-.6 0-.7-.1-.7-.7V32.5c0-.4-.1-.7-.6-.6H24c-.6.3-.6.1-.6-.3v-5.5c0-.4.1-.4.4-.4h2.8c.6 0 .7-.1.7-.7v-4.2c0-1.7.4-3.2 1.4-4.6c1.3-1.7 3.1-2.5 5.1-2.7c2.1-.1 4.2 0 6.3-.1c.3 0 .4.1.4.4v5.5q.15.6-.3.6"/></svg>​</NavLink></li>
          <li><NavLink href="#"><svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="currentcolor" d="M32 1C14.8 1 1 14.8 1 32s13.8 31 31 31s31-13.8 31-31S49.2 1 32 1m8.2 18.9h-3.1c-1.4 0-2.3.7-2.3 2c-.1 1.1 0 2.3 0 3.2c0 .4.1.4.4.4h4.6c.4 0 .6.1.6.6c-.1 1.8-.4 3.7-.4 5.5c0 .4-.1.4-.6.4h-3.7c-.8 0-.7-.1-.7.7v17.1c0 .6-.1.7-.7.7H28c-.6 0-.7-.1-.7-.7V32.5c0-.4-.1-.7-.6-.6H24c-.6.3-.6.1-.6-.3v-5.5c0-.4.1-.4.4-.4h2.8c.6 0 .7-.1.7-.7v-4.2c0-1.7.4-3.2 1.4-4.6c1.3-1.7 3.1-2.5 5.1-2.7c2.1-.1 4.2 0 6.3-.1c.3 0 .4.1.4.4v5.5q.15.6-.3.6"/></svg>​​</NavLink></li>
          <li><NavLink href="#"><svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="currentcolor" d="M32 1C14.8 1 1 14.8 1 32s13.8 31 31 31s31-13.8 31-31S49.2 1 32 1m8.2 18.9h-3.1c-1.4 0-2.3.7-2.3 2c-.1 1.1 0 2.3 0 3.2c0 .4.1.4.4.4h4.6c.4 0 .6.1.6.6c-.1 1.8-.4 3.7-.4 5.5c0 .4-.1.4-.6.4h-3.7c-.8 0-.7-.1-.7.7v17.1c0 .6-.1.7-.7.7H28c-.6 0-.7-.1-.7-.7V32.5c0-.4-.1-.7-.6-.6H24c-.6.3-.6.1-.6-.3v-5.5c0-.4.1-.4.4-.4h2.8c.6 0 .7-.1.7-.7v-4.2c0-1.7.4-3.2 1.4-4.6c1.3-1.7 3.1-2.5 5.1-2.7c2.1-.1 4.2 0 6.3-.1c.3 0 .4.1.4.4v5.5q.15.6-.3.6"/></svg>​​</NavLink></li>
          
        </ul>
      </div>
    </div>
    

    <div className="col-6 p-0">
      <h2 className="fw-700 mb-20">訂閱電子報</h2>
      <div className="input-group mb-3 email-input">
        <input type="email" className="form-control fw-500 fs-18" id="eNewsLetterEmail" aria-describedby="inputENewsLetterEmail" placeholder="請輸入 E-mail"/>
        <button className="btn btn-primary-500" type="button" id="sub-button">訂閱</button>
      </div>

    </div>


    <p className="fw-400 text-secondary-900 px-0 mb-0 border-top border-secondary-1 border-1 pt-48">Copyright ©​ 2025 Pawarm |​ 本​網站​僅供個人​作品​使用，​不​提供​商​業用​途</p>
  </div>
  </div>
</div>
    </>
  )
}

export default App
