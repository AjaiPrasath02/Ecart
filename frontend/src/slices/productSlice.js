import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        product :  {}
    },
    reducers: {
        productRequest(state, action){
            return {
                loading: true
            }
        },
        productSuccess(state, action){
            return {
                loading: false,
                product: action.payload.product,
               
            }
        },
        productFail(state, action){
            return {
                loading: false,
                error:  action.payload
            }
        },
        // adminProductsRequest(state, action){
        //     return {
        //         loading: true
        //     }
        // },
        // adminProductsSuccess(state, action){
        //     return {
        //         loading: false,
        //         products: action.payload.products,
        //     }
        // },
        // adminProductsFail(state, action){
        //     return {
        //         loading: false,
        //         error:  action.payload
        //     }
        // },
        // clearError(state, action){
        //     return {
        //         ...state,
        //         error:  null
        //     }
        // }
    }
});

const { actions, reducer } = productSlice;

export const { 
    productRequest, 
    productSuccess, 
    productFail,
    // adminProductsFail,
    // adminProductsRequest,
    // adminProductsSuccess

} = actions;

export default reducer;

