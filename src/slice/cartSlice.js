import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const{VITE_PATH,VITE_URL}=import.meta.env;

export const cartSlice= createSlice({
    name:"cart",
    initialState:{
        carts:[],
        total:0,
        final_total:0,
    },
    reducers:{
        updateCart(state,action){
            state.carts=action.payload.carts;
            state.total=action.payload.total;
            state.final_total=action.payload.final_total;
        }
    }
    
})

export const createAsyncGetCart= createAsyncThunk(
    'cart/createAsyncGetCart',
    async(_,{dispatch})=>{
        try{
            const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/cart`);
            dispatch(updateCart(res.data.data));
        }catch(error){
            console.log(error)
        }

    } 

)

export const {updateCart}=cartSlice.actions;

export default cartSlice.reducer;