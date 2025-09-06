import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {clearCredentials, setCredentials, setRole} from "../features/authSlice.ts";
import type {RootState} from "../app/store.ts";
import {userApi} from "./userApi.ts";
import type {LoginPasswordDto, UserRegisterDto} from "../models/AuthModels.ts";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/auth",
        credentials: "include",
        prepareHeaders: (headers, {getState}) => {
            headers.set("Content-Type", "application/json");
            const token = (getState() as RootState).auth.accessToken;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        }
    }),
    endpoints: (builder) => ({
        register: builder.mutation<{role: string}, UserRegisterDto>({
            query: (userRegisterDto) => ({
                url: '/register',
                method: 'POST',
                body: userRegisterDto,
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const response = await queryFulfilled;
                    const accessToken = response.meta?.response?.headers.get('Authorization')?.replace('Bearer ', '') || '';
                    dispatch(setCredentials({
                        accessToken: accessToken,
                    }));
                    if (response.data) {
                        const role = response.data.role;
                        dispatch(setRole({
                            role: role,
                        }))
                    }
                } catch (err) {
                    console.error("Register failed:", err);
                }
            }
        }),
        signIn: builder.mutation<{role: string}, LoginPasswordDto>({
            query: (loginPasswordDto) => ({
                url: '/sign-in',
                method: 'POST',
                body: loginPasswordDto,
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    dispatch(userApi.util.resetApiState());
                    const response = await queryFulfilled;
                    const accessToken = response.meta?.response?.headers.get('Authorization')?.replace('Bearer ', '') || '';
                    dispatch(setCredentials({
                        accessToken: accessToken,
                    }));
                    if (response.data) {
                        const role = response.data.role;
                        dispatch(setRole({
                            role: role,
                        }))
                    }
                } catch (err) {
                    console.error("Sign-in failed:", err);
                }
            }
        }),
        refreshToken: builder.mutation<{role: string}, {remember?: string}>({
            query: ({remember = ""}) => ({
                url: '/refresh-token',
                params: {remember},
                method: 'POST',
            }),
            onQueryStarted(_, {dispatch, queryFulfilled}) {
                (async () => {
                    try {
                        const response = await queryFulfilled;
                        const accessToken = response.meta?.response?.headers.get('Authorization')?.replace('Bearer ', '') || '';
                        dispatch(setCredentials({
                            accessToken: accessToken,
                        }));
                        if (response.data) {
                            const role = response.data.role;
                            dispatch(setRole({
                                role: role,
                            }))
                        }
                    } catch (err) {
                        console.error("Refresh token failed:", err);
                        dispatch(clearCredentials());
                    }
                })()
            }
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled;
                    dispatch(userApi.util.resetApiState());
                    dispatch(clearCredentials());
                } catch (err) {
                    console.error("Logout failed:", err);
                    dispatch(userApi.util.resetApiState());
                    dispatch(clearCredentials());
                }
            }
        }),
    })
});

export const {useRegisterMutation, useSignInMutation, useRefreshTokenMutation, useLogoutMutation} = authApi;