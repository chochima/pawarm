import axios from "axios";
import toast from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_URL;
const API_PATH = import.meta.env.VITE_PATH;

export default function ImgUpload() {
  const upload = (e) => {
    const fileInput = e.target.files[0];
    if (!fileInput) return;

    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common["Authorization"] = token;

    const formData = new FormData();
    formData.append("file-to-upload", fileInput);

    toast.promise(
      axios.post(`${API_BASE}/api/${API_PATH}/admin/upload`, formData),
      {
        loading: '圖片上傳中...',
        success: (res) => {
          const url = res.data.imageUrl;
          return `上傳成功！`;
        },
        error: (err) => `上傳失敗：${err.response?.data?.message || '不明錯誤'}`,
      }
    );
  };


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