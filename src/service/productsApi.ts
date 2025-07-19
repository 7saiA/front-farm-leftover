import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UserForProductDto{
    login: string;
    email: string;
    phone: string;
    farmName: string;
    city: string;
    street: string;
}

interface ProductDto {
    productId: number;
    productName: string;
    pricePerUnit: number;
    unit: string;
    availableQuantity: number;
    createdAt: string;
    userForProduct: UserForProductDto;
}

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/"
    }),
    refetchOnFocus: true,
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<ProductDto[], { sort?: string }>({
            query: ({sort = 'newest'} = {}) => ({
                url: 'products',
                params: {sort},
                providesTags: ['Product'],
            })
        }),
        addProduct: builder.mutation<void, { farmId: string; product: ProductDto }>({
            query: ({ farmId, product }) => ({
                url: `products/${farmId}`,
                method: "POST",
                body: product,
                invalidatesTags: ['Product']
            }),
        })
    })
});

export const { useGetProductsQuery, useAddProductMutation } = productsApi;