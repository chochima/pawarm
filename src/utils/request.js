import axios from 'axios';

// 1. 建立實例
const request = axios.create({
  baseURL: import.meta.env.VITE_URL
});

// 2. 請求攔截器 (你寫的部分，非常棒！)
request.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("hexToken="))
    ?.split("=")[1];

  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 3. 回應攔截器 (新增：統一處理錯誤)
request.interceptors.response.use(
  (response) => response, 
  (error) => {
    // 如果後端回傳 401 (Token失效)，直接踢回登入頁
    if (error.response?.status === 401) {
      alert("登入逾時，請重新登入");
      window.location.href = "#/Login"; // 根據你的路由設定調整
    }
    return Promise.reject(error);
  }
);

export default request;