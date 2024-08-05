
import { createSlice } from "@reduxjs/toolkit";
import { products } from "../../data"; 

export const productSlice = createSlice({
    name: "products",
    initialState: {
        products: products, 
        filteredProducts: products, 
    },
    reducers: {
        filterByCategory: (state, action) => {
            const category = action.payload;
           
            state.filteredProducts = state.products.filter(product => product.category === category);
        },
        sortByPrice: (state) => {
          
            const sortedProducts = [...state.products].sort((a, b) => a.price - b.price);
            state.filteredProducts = sortedProducts;        }
    }
});

export const { filterByCategory, sortByPrice } = productSlice.actions;
export default productSlice.reducer;
