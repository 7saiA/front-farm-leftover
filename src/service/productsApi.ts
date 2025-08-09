import {createApi} from "@reduxjs/toolkit/query/react";
import type {FarmDto} from "./userApi.ts";
import {baseQueryWithRefresh} from "./base-query/baseQuery.ts";

export interface ProductDto {
    productId: string;
    productName: string;
    pricePerUnit: string;
    unit: string;
    availableQuantity: number;
    farmName: string;
}

export interface FarmProductDto {
    productId: string;
    productName: string;
    pricePerUnit: string;
    unit: string;
    availableQuantity: number;
}

interface NewProductDto {
    productName: string;
    pricePerUnit: string;
    unit: string;
    availableQuantity: number;
}

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: baseQueryWithRefresh,
    refetchOnMountOrArgChange: true,
    keepUnusedDataFor: 60,
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<ProductDto[], { sort?: string }>({
            query: ({sort = 'newest'} = {}) => ({
                url: '/products/all-products',
                params: {sort},
            }),
            providesTags: ['Product'],
        }),
        addProduct: builder.mutation<FarmProductDto, NewProductDto>({
            query: (newProductDto ) => ({
                url: "/products/add-product",
                method: "POST",
                body: newProductDto,
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation<FarmProductDto, {productId: string, newProductDto: NewProductDto}>({
            query: ({productId, newProductDto}) => ({
                url: `/products/${productId}`,
                method: "PUT",
                body: newProductDto,
            }),
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation<void, string>({
            query: (productId) => ({
                url: `/products/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
        getProductsForCurrentFarm: builder.query<FarmProductDto[], void>({
            query: () => ({
                url: "/products/my-products",
                method: "GET",
            }),
            providesTags: ['Product'],
        }),
        search: builder.query<{
            products: ProductDto[];
            farms: FarmDto[];
        },string>({
            query: (query) => ({
                url: "/search",
                params: {query}
            }),
            
        })
    })
});

export const {
    useGetProductsQuery,
    useAddProductMutation,
    useSearchQuery,
    useDeleteProductMutation,
    useGetProductsForCurrentFarmQuery,
    useUpdateProductMutation
} = productsApi;