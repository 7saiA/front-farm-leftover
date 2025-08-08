import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "./base-query/baseQuery.ts";

export interface AddToCartDto {
    productId: string;
    quantity: number;
}

export interface CartItemDto {
    cartItemId: number;
    productId: string;
    productName: string;
    pricePerUnit: string;
    unit: string;
    quantity: number;
    subtotal: string;
}

export interface CartResponseDto {
    cartId: number;
    items: CartItemDto[];
    totalPrice: string;

}

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: baseQueryWithRefresh,
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getCart: builder.query<CartResponseDto,void>({
            query: () => ({
                url: "",
                method: "GET",
            }),
            providesTags: ['Cart']
        }),
        addToCart: builder.mutation<void, AddToCartDto>({
            query: (AddToCartDto)  => ({
                url: "/cart/add",
                method: "POST",
                body: AddToCartDto,
            }),
            invalidatesTags: ['Cart']

        }),
        clearCart: builder.mutation<void,void>({
            query: () => ({
                url: "/cart/clear",
                method: "DELETE",
            }),
            invalidatesTags: ['Cart']
        }),
        deleteCartItem: builder.mutation<void, { cartItemId: number }>({
            query: ({ cartItemId }) => ({
                url: `/cart/${cartItemId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Cart']
        })

    })
})

export const {useGetCartQuery, useAddToCartMutation, useClearCartMutation, useDeleteCartItemMutation} = cartApi;