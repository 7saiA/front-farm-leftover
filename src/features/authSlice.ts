import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    accessToken: null,
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
            if(state.accessToken) {}
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
        },
        clearCredentials: (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
