import {createAsyncThunk} from "@reduxjs/toolkit";
import {base_url} from "../../utils/constants.ts";
import {loginSuccess, logout} from "./authSlice.ts";

export const refreshAccessToken = createAsyncThunk(
    "auth/refreshAccessToken",
    async (_, {dispatch}) => {
        const refreshToken = localStorage.getItem("refreshToken");

        if(!refreshToken) {
            dispatch(logout());
            throw new Error("No refresh Token Found");
        }

        const response = await fetch(`${base_url}/users/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({refreshToken}),
        })

        if(!response.ok){
            dispatch(logout());
            throw new Error("Access Token refresh failed");
        }

        const data = await response.json();

        dispatch(
            loginSuccess({
                token: data.accessToken,
                login: data.login,
                role: data.roles[0],
            })
        )

        localStorage.setItem("refreshToken", data.refreshToken);

        return data.accessToken;
    }
)

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
        } catch {
            return thunkAPI.rejectWithValue("Server error");
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (
        formData: { login: string; password: string },
        thunkAPI
    ) => {
        try {
            const response = await fetch(`${base_url}/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const err = await response.text();
                return thunkAPI.rejectWithValue(err);
            }
            return await response.json();
        } catch {
            return thunkAPI.rejectWithValue("Server error");
        }
    }
)