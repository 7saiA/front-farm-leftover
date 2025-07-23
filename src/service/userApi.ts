import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

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
       baseUrl: "http://localhost:8080/users"
    }),
    refetchOnFocus: true,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getFarms: builder.query<FarmDto[], void>({
            query: () => ({
                url: '/farms',
                providesTags: ['User']
            })
        })
    })
})

export const { useGetFarmsQuery } = userApi;