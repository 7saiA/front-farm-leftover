import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {PayPalApprovalDto, PayPalUrlsDto} from "../models/PayPalModels.ts";
import type {RootState} from "../app/store.ts";

export const paypalApi = createApi({
    reducerPath: 'paypalApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/paypal",
        credentials: "include",
        prepareHeaders: (headers, {getState}) => {
            headers.set("Content-Type", "application/json");
            const token = (getState() as RootState).auth.accessToken;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        }
    }),
    endpoints: (builder) => ({
        createPayment: builder.mutation<PayPalApprovalDto, PayPalUrlsDto>({
            query: (payPalUrlsDto) => ({
                url: '/create',
                method: 'POST',
                body: payPalUrlsDto,
            })
        }),
        paySuccess: builder.mutation<{ message: string }, { paymentId: string; payerId: string }>({
            query: ({ paymentId, payerId }) => ({
                url: '/success',
                method: 'GET',
                params: { paymentId, payerId },
            })
        }),
        payCancel: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: '/cancel',
                method: 'GET',
            })
        })
    })
})

export const {
    useCreatePaymentMutation,
    usePaySuccessMutation,
    usePayCancelMutation,
} = paypalApi;