import {CartState} from "./slices/cartSlice";

export type RootState = {
    counter: CartState;
};

export type AppDispatch = typeof import('./store').store.dispatch;