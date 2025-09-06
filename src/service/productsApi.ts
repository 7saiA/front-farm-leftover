import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "./base-query/baseQuery.ts";
import type {FarmProductDto, NewProductDto, ProductDto} from "../models/ProductModels.ts";
import type {AllFarmDto} from "../models/UserModels.ts";

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: baseQueryWithRefresh,
    refetchOnMountOrArgChange: true,
    keepUnusedDataFor: 60,
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        addProduct: builder.mutation<FarmProductDto, { newProduct: NewProductDto, file?: File }>({
            query: ({newProduct, file}) => {
                const formData = new FormData();
                formData.append("newProduct", JSON.stringify(newProduct));
                if (file) {
                    formData.append("file", file);
                }
                return {
                    url: "/products/add-product",
                    method: "POST",
                    body: formData,
                }
            },
            invalidatesTags: ['Product'],
        }),
        getProducts: builder.query<ProductDto[], { sort?: string }>({
            query: ({sort = 'newest'} = {}) => ({
                url: '/products/all-products',
                params: {sort},
            }),
            providesTags: ['Product'],
        }),
        updateProduct: builder.mutation<FarmProductDto, { productId: string, product: NewProductDto, file?: File }>({
            query: ({productId, product, file}) => {
                const formData = new FormData();
                formData.append("product", JSON.stringify(product));
                if (file) {
                    formData.append("file", file);
                }
                return {
                    url: `/products/${productId}`,
                    method: "PUT",
                    body: formData,
                }
            },
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
            farms: AllFarmDto[];
        }, string>({
            query: (query) => ({
                url: "/products/search",
                params: {query: query}
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