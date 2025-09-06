import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../service/productsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import {userApi} from "../service/userApi.ts";
import {authApi} from "../service/authApi.ts";
import authSlice from "../features/authSlice.ts";
import {cartApi} from "../service/cartApi.ts";
import {orderApi} from "../service/orderApi.ts";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        [productsApi.reducerPath]: productsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productsApi.middleware)
            .concat(userApi.middleware)
            .concat(authApi.middleware)
            .concat(cartApi.middleware)
            .concat(orderApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;