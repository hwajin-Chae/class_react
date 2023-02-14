import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  selectedProduct: {},
};

// 상품 정보를 담을 slice를 만듦
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      console.log(action);
      state.productList = action.payload;
    },
    getProductById: (state, action) => {
      state.selectedProduct = action.payload;
    },
    
  }
});

export const { getAllProducts, getProductById } = productSlice.actions;

export const selectProductList = state => state.product.productList;
export const selectSelectedProduct = state => state.product.selectedProduct;

export default productSlice.reducer;