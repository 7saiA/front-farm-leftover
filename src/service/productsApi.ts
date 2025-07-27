import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
    createdAt: string;
    userForProductDto: UserForProductDto;
}

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/products"
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
        addProduct: builder.mutation<void, { farmId: string; product: ProductDto }>({
            query: ({ farmId, product }) => ({
                url: `/${farmId}`,
                method: "POST",
                body: product,
                invalidatesTags: ['Product']
            })
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