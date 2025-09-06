import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "./base-query/baseQuery.ts";
import type {AllFarmDto, FarmDto, UserDto} from "../models/UserModels.ts";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithRefresh,
    refetchOnMountOrArgChange: 30,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getFarms: builder.query<AllFarmDto[], void>({
            query: () => ({
                url: '/users/farms',
            }),
            providesTags: ['User']
        }),
        getCurrentUser: builder.query<UserDto, void>({
            query: () => ({
                url: '/users/profile',
                method: 'GET',
                extraPoints: { maxRetries: 2 },
            }),
            providesTags: ['User']
        }),
        getFarmByName: builder.query<FarmDto, string>({
            query: (farmName) => `/users/farm/${farmName}`,
            providesTags: ['User']
        }),
    })
})

export const {
    useGetFarmsQuery,
    useGetCurrentUserQuery,
    useGetFarmByNameQuery
} = userApi;