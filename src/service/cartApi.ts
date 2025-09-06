import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "./base-query/baseQuery.ts";
import type {AddToCartDto, CartResponseDto} from "../models/CartModels.ts";

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: baseQueryWithRefresh,
    refetchOnMountOrArgChange: true,
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getCart: builder.query<CartResponseDto,void>({
            query: () => ({
                url: "/cart",
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