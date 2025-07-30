import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {RootState} from "../app/store.ts";

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
    baseQuery: fetchBaseQuery({
       baseUrl: "http://localhost:8080/cart",
        prepareHeaders: (headers, { getState }) => {
           headers.set("Content-Type", "application/json");
           const token = (getState() as RootState).auth.accessToken;
           if(token){
               headers.set("Authorization", `Bearer ${token}`);
           }

           return headers;
        }
    }),
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
                url: "/add",
                method: "POST",
                body: AddToCartDto,
            }),
            invalidatesTags: ['Cart']

        }),
        clearCart: builder.mutation<void,void>({
            query: () => ({
                url: "/clear",
                method: "DELETE",
            }),
            invalidatesTags: ['Cart']
        }),
        deleteCartItem: builder.mutation<void, { cartItemId: number }>({
            query: ({ cartItemId }) => ({
                url: `/${cartItemId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Cart']
        })

    })
})

export const {useGetCartQuery, useAddToCartMutation, useClearCartMutation, useDeleteCartItemMutation} = cartApi;