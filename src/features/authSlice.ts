import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface UserDto {
    login: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    farmName: string;
    city: string;
    street: string;
}

interface AuthState {
    credentials: string | null;
    user: UserDto | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    credentials: null,
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{login: string, password: string}>) => {
            const { login, password } = action.payload;
            state.credentials = btoa(`${login}:${password}`);
            state.isAuthenticated = true;
        },
        clearCredentials: (state) => {
            state.credentials = null;
            state.user = null;
            state.isAuthenticated = false;
        },
        setUser: (state, action: PayloadAction<UserDto>) => {
            state.user = action.payload;
        }
    },
});

export const { setCredentials, clearCredentials, setUser } = authSlice.actions;
export default authSlice.reducer;