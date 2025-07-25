import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {RootState} from "../app/store.ts";

interface UserProfileDto {
    login: string;
    email: string;
    phone: string;
    farmName: string;
    city: string;
    street: string;
}

interface ProductForFarmDto {
    productId: number;
    productName: string;
    pricePerUnit: number;
    unit: string;
    availableQuantity: number;
    createdAt: string;
}

export interface FarmDto {
    login: string;
    email: string;
    phone: string;
    farmName: string;
    city: string;
    street: string;
    productForFarmDto: ProductForFarmDto[];
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
       baseUrl: "http://localhost:8080/users",
        prepareHeaders: (headers, { getState }) => {
            headers.set("Content-Type", "application/json");
            const { accessToken } = (getState() as RootState).auth;
            if (accessToken) {
                headers.set("Authorization", `Bearer ${accessToken}`);
            }

            return headers;
        }
    }),
    refetchOnFocus: true,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getFarms: builder.query<FarmDto[], void>({
            query: () => ({
                url: '/farms',
                providesTags: ['User']
            })
        }),
        getCurrentUser: builder.query<UserProfileDto, void>({
            query: () => ({
                url: '/profile',
                method: 'GET',
            }),
            providesTags: ['User']
        })
    })
})

export const { useGetFarmsQuery, useGetCurrentUserQuery } = userApi;