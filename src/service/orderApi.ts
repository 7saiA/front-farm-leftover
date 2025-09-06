import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "./base-query/baseQuery.ts";
import type {OrderResponseDto} from "../models/OrderModels.ts";

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: baseQueryWithRefresh,
    refetchOnMountOrArgChange: true,
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        placeOrder: builder.mutation<OrderResponseDto, void>({
            query: () => ({
                url: '/orders/place-order',
                method: 'POST'
            }),
            invalidatesTags: ['Order']
        }),
        reserveOrder: builder.mutation<void, void>({
            query: () => ({
                url: '/orders/reserve-order',
                method: 'POST'
            }),
        }),
        getMyOrders: builder.query<OrderResponseDto[], void>({
            query: () => ({
                url: '/orders/customer-orders',
                method: 'GET'
            }),
            providesTags: ['Order']
        }),
        cancelReservation: builder.mutation<void, void>({
            query: () => ({
                url: '/orders/cancel-reservation',
                method: 'DELETE'
            }),
            invalidatesTags: ['Order']
        }),
        getOrder: builder.query<OrderResponseDto, string>({
            query: (orderId) => ({
                url: `/orders/${orderId}`,
                method: 'GET'
            }),
            providesTags: ['Order']
        })
    })
})

export const {
    usePlaceOrderMutation,
    useReserveOrderMutation,
    useGetMyOrdersQuery,
    useCancelReservationMutation,
    useGetOrderQuery
} = orderApi;