import React, { act, useState } from "react";
import actitiveData from "../services/activity.json";

const actitive = actitiveData;




function Activity() {
    const [tempActitive,setTempActitive] = useState(actitive.actitiveData);

    const [hoverId, setHoverId] = useState(null);



    const getHoverActivity = () => {
        const hovered = tempActitive.find(act => act.id === hoverId);return hovered || tempActitive[0];
    };
    const hoverActivity = getHoverActivity();



return (
    

<div className="row justify-content-between gy-16">

{/*左邊活動資訊*/}
    <div className="col-7 mx-0 pe-0">
        {tempActitive.map((act) => (
    <div key={act.id}>
    

    <div className="row product-card custom-card-bg activity-card mb-32"
        onMouseEnter={() => setHoverId(act.id)}
        onMouseLeave={() => setHoverId(null)}>
    
        {/*活動類型 + 日期*/}
        <div className="row px-0 mx-0">

            <div className="col px-0 pb-12">
                <span className="bg-primary-100 border border-primary-300 fs-14 px-12 newItem badge rounded-pill fw-bold">{act.type}</span>
            </div>

            <div className="col text-end px-0">
                <p className="mb-0">{act.date}</p>
            </div>

        </div>

        {/*活動資訊*/}
        <div className="row px-0 mx-0">

            <div className="col-11 px-0">
                <h3 className="mb-4">{act.title}</h3>
                <p className="text-truncate mb-0">{act.description}</p>
            </div>

            <div className="col-1 text-end align-self-end px-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mx-8 my-8" viewBox="0 0 24 24"><path fill="none" stroke="#3D3D3D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m13 15l3-3m0 0l-3-3m3 3H8m13 0a9 9 0 1 0-18 0a9 9 0 0 0 18 0Z"/></svg>
            </div>

        </div>

    </div>


    </div>
    ))}
    </div>

{/*右邊活動圖片*/}
    <div className="col-4 px-0 mt-0">
        <img
            src={hoverActivity.imageUrl}
            alt={hoverActivity.title}
        />
        <p className="text-center">{hoverActivity.title}</p>
    </div>


</div>

);
}

export default Activity;
