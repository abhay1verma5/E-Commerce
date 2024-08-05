
import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        add: (state, action) => {
            const { id } = action.payload;
            const existingItem = state.find(item => item.id === id);

            if (existingItem) {
              
                existingItem.quantity++;
            } else {
               
                state.push({ ...action.payload, quantity: 1 });
            }

          
            localStorage.setItem("cart", JSON.stringify(state));
        },
        remove: (state, action) => {
            const { id } = action.payload;
            const existingItemIndex = state.findIndex(item => item.id === id);

            if (existingItemIndex !== -1) {
                const existingItem = state[existingItemIndex];

               
                if (existingItem.quantity > 1) {
                    existingItem.quantity--;
                } else {
                   
                    state.splice(existingItemIndex, 1);
                }

               
                localStorage.setItem("cart", JSON.stringify(state));
            }
        }
    }
});

export const { add, remove } = CartSlice.actions;
export default CartSlice.reducer;
