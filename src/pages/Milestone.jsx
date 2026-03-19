import React from "react";
import { useSelector , useDispatch} from "react-redux";
import { NavLink ,Outlet} from "react-router"
import ImgUpload from "../components/ImgUpload";
import ImgLibrary from "../components/ImgLibrary";
import CoBrand from "../components/CoBrand";
import MilestoneStep from "../components/MilestoneStep";
import MileD3 from "../components/MileD3";


import milistoneIMG from "../image/milistone.png";
import bgMilestone from "../image/bg-milestone.png";
import bgMilestoneMob from "../image/bg-milestone-mobile.png";






const { useState } = React;
export default function Milestone() {
  
  //儀錶板資料
    const caseData = [
      {
        "title":"累積捐款金額(NT$)",
        "caseNum":"27,853,​612",
        "classStyle":"col-12"
      },

      {
        "title":"累積救援案件",
        "caseNum":"17",
        "classStyle":"col-12 col-md-4"
      },

      {
        "title":"醫療康復案例",
        "caseNum":"3",
        "classStyle":"col-12 col-md-4"
      },
      
      {
        "title":"已協助動物總數",
        "caseNum":"123",
        "classStyle":"col-12 col-md-4"
      }
    ];

    const pieData = [
  { name: "A", value: 30 },
  { name: "B", value: 70 },
  { name: "C", value: 45 },
  { name: "D", value: 85 },
];

  return (<>
  {
  //HERO
  <section className="milestone-hero-bg">
    <div className="container">
    <div className="row milestone-hero-content">
    
      <div className="col-auto col-md-6 px-md-0 pb-24 pb-md-48 justify-content-md-end">
        <img src={milistoneIMG} alt="里程碑BG"/>
      </div>

      <div className="col-12 col-md-6 px-md-0 ps-md-100">
          <h2 className="mb-0 title-text text-primary-500">看見你的影響力</h2>
    
          <p className="body-text pt-20 pt-md-32 mb-24  mb-md-48">
          每​一​分​支持，​都​清晰​可見。​<br/>
          從​購買​到​救援，​我​們讓愛​有​跡​可循。​​</p>
      </div>

    </div>

    <img className="d-none d-md-block" src={bgMilestone} alt="里程碑BG"/>

    <img className="d-md-none" src={bgMilestoneMob} alt="里程碑BG-mob"/>

    </div>
  </section>
  }


  {
  //影響力儀錶板
  <section className="mileDash-bg-img">
  <div className="container">
  <h2 className="mb-0 title-text">影響力儀錶板</h2>
  
    <div className="row mileDash-text-style d-flex justify-content-center mx-1">

      {caseData.map((caseItem,index) => (
        <div key={index} className={caseItem.classStyle}>
          <h3 className="body-text">{caseItem.title}</h3>
          <p>{caseItem.caseNum}</p>
        </div>
      ))}

    </div>
  </div>
  </section>
  }


  {
  //捐款動向 >> 目前只載入D3
  <section className="">
    <div className="container py-32 py-md-120">

      <h2 className="col mb-0 title-text px-0">捐款動向</h2>
      <div className="row">
        <div>
      <h1>D3 CDN + React 範例</h1>
      <MileD3 data={pieData} width={500} height={500} />
    </div>


      </div>

    </div>
  </section>
  }


  {
  //公益里程碑
  <MilestoneStep />

  }



  {
  //合作夥伴
  <section className="py-48 py-md-120">
  <div className="container">

    <h2 className="col mb-0 title-text">合作夥伴</h2>
    <div className="row py-md-32">

      <div className="col-12 col-xl-4">
        <p className="body-text pt-20 pt-md-32 mb-24  mb-md-48">
        你的每一次支持<br/>
        都在為牠們的世界帶來光亮</p>
        
        <NavLink to="products">
          <button className="btn btn-primary-500 px-md-44 py-md-16 text-white eNews" type="button" id="products-button">逛逛商品，支持動物</button>
        </NavLink>
      </div>

      <div className="col d-flex justify-content-center pt-24 pt-md-0">
      <CoBrand />
      </div>

    
  
  </div>
  </div>
  </section>
  }

  


  
  {/*
<ImgUpload />
  <ImgLibrary/>
  */}
  

  
  </>);
}