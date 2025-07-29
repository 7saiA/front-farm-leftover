import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {RootState} from "../app/store.ts";

export interface UserDto {
    userName: string;
    email: string;
    phone: string;
    farmName: string;
    city: string;
    street: string;
    products: ProductForFarmDto[];
}

export interface FarmDto extends AllFarmDto{
    products: ProductForFarmDto[];
}

export interface AllFarmDto{
    farmName: string;
    email: string;
    phone: string;
    city: string;
    street: string;
}

export interface ProductForFarmDto {
    productId: string;
    productName: string;
    pricePerUnit: number;
    unit: string;
    availableQuantity: number;
}

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
        getFarms: builder.query<AllFarmDto[], void>({
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
        }),
        getFarmByName: builder.query<FarmDto, string>({
            query: (farmName) => `/farm/${farmName}`
        })
    })
})

export const {useGetFarmsQuery, useGetCurrentUserQuery, useGetFarmByNameQuery} = userApi;