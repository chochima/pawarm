import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_URL;
const API_PATH = import.meta.env.VITE_PATH;

export default function ImgUpload() {
    function upload(e) {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common["Authorization"] = token;
        
    
        const fileInput = e.target.files[0];
        const formData = new FormData();
        formData.append("file-to-upload", fileInput);

        axios.post(`${API_BASE}/api/${API_PATH}/admin/upload`, formData)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }


    return (<>
    <div className="container">

        <input
            type="file"
            className="form-control"
            id="file"
            placeholder = "請輸入圖片連結" 
            onChange={upload}
        />
    
    </div>
    </>);
}