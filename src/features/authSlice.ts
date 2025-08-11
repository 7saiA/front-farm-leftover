import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    accessToken: string | null;
    role: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    accessToken: null,
    role: null,
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
        clearCredentials: (state) => {
            state.accessToken = null;
            state.role = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setCredentials, setRole, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
