import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null, // 建議用 null，判斷 isAuth 時更精準
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    // 封裝好登出邏輯
    logout(state) {
      state.token = null;
      // 在 Reducer 裡直接清 Cookie 是可行的，但最標準做法是在組件清，這裡只管狀態
      document.cookie = "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;