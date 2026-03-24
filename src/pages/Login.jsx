import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux"; 
import { setToken } from "../slice/authSlice"; 

import axios from "axios";
import toast from 'react-hot-toast';

// 移除未使用的 VITE_PATH 警告
const { VITE_URL } = import.meta.env;

function Login() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(`${VITE_URL}/admin/signin`, data);
      const { token, expired } = response.data;

      // 1. 更新 Redux
      dispatch(setToken(token));

      // 🚩 加上註解解決 ESLint 的 immutability 報錯
      // eslint-disable-next-line react-hooks/immutability
      document.cookie = `hexToken=${token};expires=${new Date(expired)};path=/`;
      
      // eslint-disable-next-line react-hooks/immutability
      axios.defaults.headers.common.Authorization = token;

      toast.success("登入成功！歡迎回來。");
      navigate("/");

    } catch (err) {
      toast.error(`登入失敗：${err.response?.data?.message || '伺服器錯誤'}`);
    }
  };

  useEffect(() => {
    const existingToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (existingToken) {
      dispatch(setToken(existingToken));
       
      axios.defaults.headers.common.Authorization = existingToken;
      navigate("/");
    }
  }, [dispatch, navigate]); 

  return (
    <>
      <div className="login-bg-img">
        <div className="container login mt-5">
          <div className="row justify-content-center justify-content-md-end">
            <div className="col-12 col-md-6 login-bg">
              <h2 className="h3 mb-3 font-weight-normal text-center title-text-H3 text-secondary-900">會員登入</h2>
              <div className=" px-0">
                <form id="form" className="form-signin" onSubmit={handleSubmit(handleLogin)}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="username"
                      {...register("username", {
                        required: "請輸入 Email 地址",
                        pattern: { value: /^\S+@\S+$/i, message: "格式不正確" },
                      })}
                      autoFocus
                    />
                    <label htmlFor="username">Email address</label>
                    {errors.username && <p className="text-danger mt-1">{errors.username.message}</p>}
                  </div>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      {...register("password", {
                        required: "請輸入 密碼",
                        minLength: { value: 3, message: "至少需 3 碼" },
                      })}
                    />
                    <label htmlFor="password">Password</label>
                    {errors.password && <p className="text-danger mt-1">{errors.password.message}</p>}
                  </div>
                  <button className="btn btn-lg btn-primary w-100 mt-3" type="submit">
                    登入
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;