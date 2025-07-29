import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {RootState} from "../app/store.ts";
import type {FarmDto} from "./userApi.ts";

export interface UserForProductDto{
    login: string;
    email: string;
    phone: string;
    farmName: string;
    city: string;
    street: string;
}

export interface ProductDto {
    productId: number;
    productName: string;
    pricePerUnit: number;
    unit: string;
    availableQuantity: number;
    farmName: string;
}

export interface FarmProductDto {
    productId: number;
    productName: string;
    pricePerUnit: number;
    unit: string;
    availableQuantity: number;
}

interface NewProductDto {
    productName: string;
    pricePerUnit: number;
    unit: string;
    availableQuantity: number;
}

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/products",
        prepareHeaders: (headers, { getState }) => {
            headers.set("Content-Type", "application/json");
            const token = (getState() as RootState).auth.accessToken;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        }
    }),
    refetchOnFocus: true,
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<ProductDto[], { sort?: string }>({
            query: ({sort = 'newest'} = {}) => ({
                url: '/all-products',
                params: {sort},
                providesTags: ['Product'],
            })
        }),
        addProduct: builder.mutation<FarmProductDto, NewProductDto>({
            query: (newProductDto ) => ({
                url: "/add-product",
                method: "POST",
                body: newProductDto,
            }),
            invalidatesTags: ['Product']
        }),
        search: builder.query<{
            products: ProductDto[];
            farms: FarmDto[];
        },string>({
            query: (query) => ({
                url: "/search",
                params: {query}
            })
        })
    })
});

export const { useGetProductsQuery, useAddProductMutation, useSearchQuery } = productsApi;