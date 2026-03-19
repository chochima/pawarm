import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setToken } from "../slice/authSlice";
import axios from "axios";
import toast from 'react-hot-toast';

const { VITE_URL } = import.meta.env;

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // 🚀 避免重複點擊

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { username: "", password: "" },
    mode: "onTouched" // 🚀 在離開輸入框時即進行驗證
  });

  // 🚀 封裝：統一處理 Token 存儲
  const applyAuthData = (token, expired) => {
    // 1. Redux
    dispatch(setToken(token));
    // 2. Cookie (設定過期時間與安全性屬性)
    document.cookie = `hexToken=${token}; expires=${new Date(expired).toUTCString()}; path=/; SameSite=Lax`;
    // 3. Axios Global Header
    axios.defaults.headers.common.Authorization = token;
  };

  const handleLogin = async (data) => {
    setIsSubmitting(true);
    const loadingToast = toast.loading("驗證中，請稍候...");

    try {
      const response = await axios.post(`${VITE_URL}/admin/signin`, data);
      const { token, expired, message } = response.data;

      applyAuthData(token, expired);

      toast.success(message || "登入成功！歡迎回來。", { id: loadingToast });
      navigate("/");
    } catch (err) {
      const errorMsg = err.response?.data?.message || '登入失敗，請確認帳號密碼';
      toast.error(`登入失敗：${errorMsg}`, { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🚀 自動檢查登入狀態
  useEffect(() => {
    const tokenRegex = /(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$/;
    const existingToken = document.cookie.replace(tokenRegex, "$1");

    if (existingToken) {
      axios.defaults.headers.common.Authorization = existingToken;
      dispatch(setToken(existingToken));
      // 可選：此處可加入 axios.post(`${VITE_URL}/api/user/check`) 驗證 Token 是否真的過期
      navigate("/");
    }
  }, [dispatch, navigate]);

  return (
    <div className="container mt-5 py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 p-4">
            <h1 className="h4 mb-4 fw-bold text-center text-primary">管理員登入</h1>
            
            <form onSubmit={handleSubmit(handleLogin)}>
              {/* Email 欄位 */}
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  id="username"
                  placeholder="name@example.com"
                  {...register("username", {
                    required: "請輸入 Email 地址",
                    pattern: { 
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                      message: "Email 格式不正確" 
                    },
                  })}
                />
                <label htmlFor="username">Email Address</label>
                {errors.username && (
                  <div className="invalid-feedback">{errors.username.message}</div>
                )}
              </div>

              {/* 密碼欄位 */}
              <div className="form-floating mb-4">
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "請輸入密碼",
                    minLength: { value: 6, message: "密碼長度至少需 6 碼" },
                  })}
                />
                <label htmlFor="password">Password</label>
                {errors.password && (
                  <div className="invalid-feedback">{errors.password.message}</div>
                )}
              </div>

              <button 
                className="btn btn-primary w-100 py-3 fw-bold shadow-sm" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="spinner-border spinner-border-sm me-2"></span>
                ) : "立即登入"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;