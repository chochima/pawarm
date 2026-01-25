import React from "react";

const { useState } = React;
export default function App() {

  return (


  <div className="container text-sans">
  <div className="row header-style">

    <div className="col-2 bg-01">
      <a href="#"><img src="/pawarm.svg" alt="pawarm LOGO" /></a>
    </div>

    <div className="col bg-02 align-self-center ps-0 pe-0">
      <ul className="nav-content">
        <li><a className="link-secondary-700" href="#">選擇​我​的​動物​​​</a></li>
        <li><a className="link-secondary-700" href="#">查看保育組織​​</a></li>
        <li><a className="link-secondary-700" href="#">追蹤​動物​​</a></li>
        <li><a className="link-secondary-700" href="#">活動資訊​​</a></li>
        <li><a className="link-secondary-700" href="#">關於我們​​</a></li>
      </ul>
    </div>

    <div className="col-2 bg-03">
      Column
    </div>

  </div>
  </div>



  )
}