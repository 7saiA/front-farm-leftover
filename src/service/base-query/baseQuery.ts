import {type BaseQueryFn, type FetchArgs, fetchBaseQuery, type FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import type {RootState} from "../../app/store.ts";
import {clearCredentials, setCredentials} from "../../features/authSlice.ts";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
    credentials: "include"
});

let refreshPromise: Promise<string | null> | null = null;

export const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (!refreshPromise) {
            refreshPromise = (async () => {
                try {
                    const refreshResult = await fetch("http://localhost:8080/auth/refresh-token", {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    console.log("[DEBUG] Refresh status:", refreshResult.status);

                    if (refreshResult.ok) {
                        const newToken = refreshResult.headers.get("Authorization")?.replace("Bearer ", "") ?? null;
                        return newToken;
                    } else {
                        api.dispatch(clearCredentials());
                        console.error("[DEBUG] Refresh failed with status:", refreshResult.status);
                        return null;
                    }
                } finally {
                    refreshPromise = null;
                }
            })();
        }

        const newToken = await refreshPromise;

        if (newToken) {
            api.dispatch(setCredentials({accessToken: newToken}));
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};


