import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "./Slices/CartSlice";
import ProductSlice from "./Slices/ProductSlice";
import AuthSlice from "./Slices/AuthSlice";
export const store = configureStore({
    reducer:{
        cart: CartSlice.reducer,
        products:ProductSlice,
       auth:AuthSlice
    }
});