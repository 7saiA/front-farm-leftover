import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {RootState} from "../app/store.ts";
import type {UserDto} from "./authApi.ts";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/users",
        prepareHeaders: (headers, {getState}) => {
            headers.set("Content-Type", "application/json");
            const token = (getState() as RootState).auth.accessToken;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    refetchOnFocus: true,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getFarms: builder.query<UserDto[], void>({
            query: () => ({
                url: '/farms',
                providesTags: ['User']
            })
        }),
        getCurrentUser: builder.query<UserDto, void>({
            query: () => ({
                url: '/profile',
                method: 'GET',
            }),
            providesTags: (result) =>
                result ? [{ type: 'User', id: 'CURRENT' }] : [],
            extraOptions: { maxRetries: 1 },
        }),
        getFarmById: builder.query<UserDto, string>({
            query: (farmId) => `/farm/${farmId}`,  // Просто принимаем строку
            providesTags: (result, error, farmId) =>
                [{ type: 'User', id: farmId }]
        })
    })
})

export const {useGetFarmsQuery, useGetCurrentUserQuery, useGetFarmByIdQuery} = userApi;