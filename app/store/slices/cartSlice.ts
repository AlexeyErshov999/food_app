import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from "@/app/shared/types";

export interface CartState {
    products: Product[];
}

const initialState: CartState = {
    products: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter((product: Product) => product.id !== action.payload);
        },
    },
});

export const {addToCart, removeFromCart} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;