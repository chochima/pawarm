import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
  },
  reducers: {
    // 登入成功時，呼叫這個來更新全站狀態
    setToken(state, action) {
      state.token = action.payload;
    },
    // 登出時清空
    logout(state) {
      state.token = "";
      document.cookie = "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;