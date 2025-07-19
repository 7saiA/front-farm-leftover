import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

interface UserRegisterDto {
    login: string;
    email: string;
    password: string;
    phone: string;
    farmName?: string;
    city?: string;
    street?: string;
}

interface LoginDto {
    login: string;
    password: string;
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/auth",
        prepareHeaders: (headers, { getState }) => {
            const auth = (getState() as any).auth;
            if (auth?.credentials) {
                headers.set('Authorization', `Basic ${auth.credentials}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation<UserDto, LoginDto>({
            query: (credentials) => ({
                url: "/sign-in",
                method: "POST",
                headers: {
                    'Authorization': `Basic ${btoa(`${credentials.login}:${credentials.password}`)}`
                },
                body: credentials
            }),
            invalidatesTags: ['Auth'],
        }),
        getCurrentUser: builder.query<UserDto, void>({
            query: () => "/profile",
            providesTags: ['Auth'],
        }),
        register: builder.mutation<UserDto, UserRegisterDto>({
            query: (userData) => ({
                url: "/register",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
});

export const {
    useLoginMutation,
    useGetCurrentUserQuery,
    useRegisterMutation
} = authApi;