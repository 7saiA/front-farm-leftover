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
    const initialResult = await baseQuery(args, api, extraOptions);

    if (initialResult.error?.status === 401) {
        console.log("[DEBUG] Attempting token refresh...");

        try {
            // Make refresh request with credentials
            const refreshResult = await fetch("http://localhost:8080/auth/refresh-token", {
                method: "POST",
                credentials: "include", // Crucial for cookies
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log("[DEBUG] Refresh status:", refreshResult.status);

            if (refreshResult.ok) {
                const newToken = refreshResult.headers.get("Authorization")?.replace("Bearer ", "");
                if (newToken) {
                    api.dispatch(setCredentials({ accessToken: newToken }));
                    return baseQuery(args, api, extraOptions); // Retry original request
                }
            }
        } catch (error) {
            console.error("[DEBUG] Refresh failed:", error);
        }

        // If we get here, refresh failed
        api.dispatch(clearCredentials());
    }

    return initialResult;
};

