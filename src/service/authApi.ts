import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {clearCredentials, setCredentials} from "../features/authSlice.ts";
import type {RootState} from "../app/store.ts";

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

export interface AuthResponse {
    accessToken: string;
    refreshToken: string | null;
    userDto: UserDto;
}

interface UserRegisterDto {
    login: string;
    email: string;
    password: string;
    phone: string;
    farmName?: string;
    city?: string;
    street?: string;
}

interface LoginPasswordDto {
    login: string;
    password: string;
}


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/auth",
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            headers.set("Content-Type", "application/json");
            const { accessToken } = (getState() as RootState).auth;
            if (accessToken) {
                headers.set("Authorization", `Bearer ${accessToken}`);
            }

            return headers;
        }
    }),
    endpoints: (builder) => ({
        register: builder.mutation<UserDto, UserRegisterDto>({
            query: (userRegisterDto) => ({
                url: '/register',
                method: 'POST',
                body: userRegisterDto,
            }),
        }),
        signIn: builder.mutation<AuthResponse, LoginPasswordDto>({
            query: (loginPasswordDto) => ({
                url: '/sign-in',
                method: 'POST',
                body: loginPasswordDto,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials({
                        accessToken: data.accessToken,
                        user: data.userDto
                    }));
                } catch (err) {
                    console.error("Sign-in failed:", err);
                }
            }
        }),
        refreshToken: builder.mutation<AuthResponse, void>({
            query: () => ({
                url: '/refresh-token',
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials({
                        accessToken: data.accessToken,
                        user: data.userDto
                    }));
                } catch (err) {
                    console.error("Refresh token failed:", err);
                    dispatch(clearCredentials());
                }
            }
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(clearCredentials());
                } catch (err) {
                    console.error("Logout failed:", err);
                    dispatch(clearCredentials());
                }
            }
        }),
    })
});

export const {useRegisterMutation, useSignInMutation, useRefreshTokenMutation, useLogoutMutation} = authApi;