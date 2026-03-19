import { useState, useEffect } from "react";
import mileage from "../services/mileage.json";


import iconMiliDot from "../image/icon-miliDot.png";
import iconMiliDotMob from "../image/icon-miliDot-mob.png";
import bgMileVector from "../image/mile-Vector.png";


export default function MilestoneStep() {
    const [tempMileage,setTempMileage] = useState(mileage.mileage);
    const [hoverId, setHoverId] = useState(null);
    

    const getHoverMileage = () => {
        const hovered = tempMileage.find(mile => mile.id === hoverId);return hovered || tempMileage[0];
    };
    const hoverMileage = getHoverMileage();


    //點點定位
    const dots = [
        [68, 0],
        [76, 20],
        [53, 39],
        [35, 59],
        [7, 78]
    ];

    //文字定位
    const text = [
        [15, 0],
        [70, 20],
        [-10, 39],
        [20, 59],
        [-22, 83]
    ];




    return (<>
    
        


    {/*公益里程碑*/}
    <section className="mileage">
    <div className="container">
    <h2 className="mb-52 title-text">公益里程碑</h2>
        

        {/*里程碑STEP*/} 
        <div className="col mileage-bg-img my-lg-120">
        <img src={bgMileVector} alt="里程碑step-BG" className="d-none d-xl-block" />
        {tempMileage.map((mile,index) => (
            <div key={mile.id}>
            <div className="row"
            onMouseEnter={() => setHoverId(mile.id)}
            onMouseLeave={() => setHoverId(null)}>

            {/*里程碑STEP web*/}
            <div className="mile-item d-none d-xl-block">

                {/*點點定位*/}
                {dots[index] && (
                    <div style={{
                    position: "absolute",
                    top: `${dots[index][0]}%`,
                    left: `${dots[index][1]}%`,
                    }} className="mile-item">
                    <img src={iconMiliDot} alt="icon-里程碑dot" />
                    </div>
                )}

                {/*文字定位*/}
                {text[index] && (
                    <div style={{
                    position: "absolute",
                    top: `${text[index][0]}%`,
                    left: `${text[index][1]}%`,
                    }} className="mile-item logos">

                    <img src={mile.stepUrl} alt={mile.id} className="d-block ms-auto pb-8" />
                    <p className="body-text-4 mb-8">{mile.date}</p>
                    <h3>{mile.title}</h3>

                </div>
                )}
                

            </div>


            {/*里程碑STEP mob*/}
            <div className="d-xl-none">
                <div className="col d-flex mileage-content-step-mob">
                    <img src={iconMiliDotMob} alt="icon-里程碑dot-mob" />
                    <p className="body-text-4 mb-4">{mile.date}</p>
                </div>

                <div className="col-12 d-flex mileage-content-step-text">
                    <span className="mileage-content-step-mob-textLine"></span>
                    <h3 className="ps-28 pb-24 pe-8">{mile.title}</h3>
                </div>
            </div>

        </div>
        </div>
        ))}
        </div>


        {/*里程碑介紹*/}
        <div className="row pt-32 justify-content-around">

            {/*左邊文字*/}
            <div className="col col-md-8 px-xll-0 d-flex align-items-center">
            <div className=" mileage-content-body">
                <p className="body-text-4 px-0">{hoverMileage.date}</p>
                <h3>{hoverMileage.title}</h3>
                <h4>{hoverMileage.content}</h4>
            </div>
            </div>
            

            {/*右邊圖片*/}
            <div className="col-12 col-md-3 px-0 mt-0 d-flex mileage-img order-1 order-lg-2 d-none d-xl-block">
                <img
                    src={hoverMileage.image}
                    alt={hoverMileage.title}
                />
            </div>
        
            <div className="col-12 d-xl-none mt-32 mileage-img d-flex justify-content-center">
                <img
                src={hoverMileage.image}
                alt={hoverMileage.title}
                />
            </div>
        
        
        </div>

    </div>
    
    </section>

    </>);
}
