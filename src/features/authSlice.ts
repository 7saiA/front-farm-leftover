import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { base_url } from "../utils/constants.ts";

interface AuthState {
    token: string | null;
    role: 'GUEST' | 'USER' | 'FARMER' | 'MODERATOR' | 'ADMIN' | null;
    login: string | null;
    loading: boolean;
    error: string | null;
}

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (
        formData: { login: string; email: string; password: string; phone: string },
        thunkAPI
    ) => {
        try {
            const response = await fetch(`${base_url}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const err = await response.text();
                return thunkAPI.rejectWithValue(err);
            }
            return await response.json(); // вернётся { token, role, login }
        } catch (error) {
            return thunkAPI.rejectWithValue("Server error");
        }
    }
);

const initialState: AuthState = {
    token: localStorage.getItem('token'),
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
            });
    }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;