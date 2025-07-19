import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../service/productsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import {userApi} from "../service/userApi.ts";

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productsApi.middleware)
            .concat(userApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;