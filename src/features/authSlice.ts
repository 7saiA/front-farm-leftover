import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {UserDto} from "../service/authApi.ts";

interface AuthState {
    accessToken: string | null;
    user: UserDto | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    accessToken: null,
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{
                accessToken: string;
                user: UserDto;  // No refreshToken here
            }>
        ) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        clearCredentials: (state) => {
            state.accessToken = null;
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
