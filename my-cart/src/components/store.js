import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../feature/cartSlice";

// 전역 state를 보관하는 저장소 만들기

export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});