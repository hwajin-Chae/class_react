import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../../api/productAPI";

const initialState = {
  productList: [],
  selectedProduct: {},
  status: 'idle'    // 1) API 요청에 대한 상태 관리가 쉽게 가능 --->을 위해 status 넣음
};

// thunk를 이용한 비동기 작업 처리하기
// 이점?
// 1) API 요청에 대한 상태 관리가 쉽게 가능
// (요청 시작-로딩 중, 요청 성공 또는 실패 시 로딩이 끝났음을 명시)
// 2) 요청이 성공하면 응답에 대한 상태 관리, 실패하면 에러에 대한 상태 관리 등

// thunk: 미들 웨어 = 액션을 디스패치 했을 때 리듀서에서 이를 처리하기에 앞서 사전에 지정된 작업을 실행
// 액션과 리듀서 중간에 끼어있는 중간자 역할, 액션 -> (미들웨어) -> 리듀서

// createAsyncThunk();는 비동기 작업을 처리하는 액션 생성 함수를 만들어 줌
export const getMoreProductsAsync = createAsyncThunk(
  'product/getMoreProductsAsync', // action type
  async () => {  // action이 발생 했을 때 실행할 비동기 작업
    const result = await getProducts();
    return result;  // 값을 반환(return)하면 'fulfilled' 상태로 변경되고(cf. pending-fulfilled-rejected), result가 action.payload에 담겨 리듀서 함수로 전달됨
  }
);


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

    // 더보기 버튼 클릭 시 전역 상태에 상품 목록 추가하는 리듀서
    getMoreProducts: (state, action) => {
      // console.log(action.payload);
      state.productList.push(...action.payload);
    }
  },

  // 비동기적인 작업에는 extraReducer를 사용
  extraReducers: (builder) => {
    builder
      .addCase(getMoreProductsAsync.pending, (state) => {  // pending 상태 일 때 동작할 리듀서
        state.status = 'loading';
      })
      .addCase(getMoreProductsAsync.fulfilled, (state, action) => {  // fulfilled 상태 일 때 동작할 리듀서
        state.status = 'idle';  // complete, success 등
        state.productList.push(...action.payload);
      })
      .addCase(getMoreProductsAsync.rejected, (state) => {  // rejected 상태 일 때 동작할 리듀서
        state.status = 'fail';
      })
  }
});


export const { getAllProducts, getProductById, getMoreProducts } = productSlice.actions;

export const selectProductList = state => state.product.productList;
export const selectSelectedProduct = state => state.product.selectedProduct;
export const selectStatus = state => state.product.status;

export default productSlice.reducer;