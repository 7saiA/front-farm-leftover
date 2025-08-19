import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    accessToken: string | null;
    role: string | null;
    isAuthenticated: boolean;
    rememberMe: boolean;
}

const initialState: AuthState = {
    accessToken: null,
    role: null,
    isAuthenticated: false,
    rememberMe: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{
                accessToken: string;
            }>
        ) => {
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
        },
        setRole: (
            state,
            action: PayloadAction<{
                role: string;
            }>
        ) => {
            state.role = action.payload.role;
        },
        setRememberMe: (state, action: PayloadAction<boolean>) => {
            state.rememberMe = action.payload;
            if (action.payload) {
                localStorage.setItem('rememberMe', '1');
            } else {
                localStorage.removeItem('rememberMe');
            }
        },
        clearCredentials: (state) => {
            state.accessToken = null;
            state.role = null;
            state.isAuthenticated = false;
            state.rememberMe = false;
            localStorage.removeItem("rememberMe");
        },
    },
});

export const { setCredentials, setRole, clearCredentials, setRememberMe} = authSlice.actions;
export default authSlice.reducer;
