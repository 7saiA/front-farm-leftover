import {type BaseQueryFn, type FetchArgs, fetchBaseQuery, type FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import type {RootState} from "../../app/store.ts";
import {clearCredentials, setCredentials} from "../../features/authSlice.ts";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: (headers, { getState }) => {
        headers.set("Content-Type", "application/json");
        const token = (getState() as RootState).auth.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    },
    credentials: "include"
})

export const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args,api,extraOptions);
    if (result.error?.status === 401) {
        console.log("Получил 401")
        const refreshResult = await baseQuery({
            url: "/auth/refresh-token",
            method: "POST"
        }, api, extraOptions);
        console.log("Ответ от запроса", refreshResult)
        if (refreshResult.meta) {
            console.log("Refresh result", refreshResult)
            console.log("Header", refreshResult.meta?.response?.headers)
            const newToken = refreshResult.meta?.response?.headers.get('Authorization')?.replace('Bearer ', '') || '';
            console.log("Новый токен", newToken)
            api.dispatch(setCredentials({
                accessToken: newToken
            }))
            result = await baseQuery(args,api,extraOptions);
        } else {
            console.log("Я попал в else")
            api.dispatch(clearCredentials());
            return result
        }
    }
    return result
}

