import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "./base-query/baseQuery.ts";

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
    imgUrl: string;
}

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