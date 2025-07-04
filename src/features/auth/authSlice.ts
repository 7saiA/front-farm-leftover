import {  createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {loginUser, registerUser} from "./authThunks.ts";

interface AuthState {
    token: string | null;
    refreshToken: string | null;
    role: 'GUEST' | 'USER' | 'FARM' | 'MODERATOR' | 'ADMIN' | null;
    login: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    role: (localStorage.getItem('role') as AuthState['role']) ?? 'GUEST',
    login: localStorage.getItem('login'),
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (
            state,
            action: PayloadAction<{ token: string; role: AuthState['role']; login: string }>
        ) => {
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.login = action.payload.login;

            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('role', action.payload.role ?? 'GUEST');
            localStorage.setItem('login', action.payload.login);
        },
        logout: (state) => {
            state.token = null;
            state.role = 'GUEST';
            state.login = null;

            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('login');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.role = action.payload.role;
                state.login = action.payload.login;

                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("role", action.payload.role);
                localStorage.setItem("login", action.payload.login);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.accessToken;
                state.role = action.payload.roles[0];
                state.login = action.payload.login;

                localStorage.setItem("token", action.payload.accessToken);
                localStorage.setItem("refreshToken", action.payload.refreshToken)
                localStorage.setItem("role", action.payload.roles[0]);
                localStorage.setItem("login", action.payload.login);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;