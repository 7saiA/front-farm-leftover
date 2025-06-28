import {configureStore} from "@reduxjs/toolkit";
import pageReducer from "../features/pageSlice.ts";
import authReducer from '../features/authSlice';


export const store = configureStore({
    reducer: {
        page: pageReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;