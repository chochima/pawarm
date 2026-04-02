import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const { VITE_PATH, VITE_URL } = import.meta.env;

// Thunk 改為回傳 API 的原始資料
export const createAsyncGetCart = createAsyncThunk(
  'cart/createAsyncGetCart',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/cart`);
      return res.data.data; // 這裡回傳的值會進到 fulfilled 的 action.payload
    } catch (error) {
      // 建議使用 rejectWithValue 處理錯誤，不要直接在 Thunk 裡 alert
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    total: 0,
    final_total: 0,
    isLoading: false, // 增加一個讀取狀態
  },
  reducers: {
    // 如果其他地方還需要手動更新，保留這個，否則可移除
    updateCart(state, action) {
      state.carts = action.payload.carts;
      state.total = action.payload.total;
      state.final_total = action.payload.final_total;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAsyncGetCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAsyncGetCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.carts = action.payload.carts;
        state.total = action.payload.total;
        state.final_total = action.payload.final_total;
      })
      .addCase(createAsyncGetCart.rejected, (state, action) => {
        state.isLoading = false;
        console.error("購物車獲取失敗:", action.payload);
      });
  }
});

export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer;