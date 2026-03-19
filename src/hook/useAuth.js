import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];

    if (!token) {
      navigate("/Login");
    }
  }, [navigate]);

  return !!document.cookie.includes("hexToken="); // 回傳布林值，代表是否登入
};