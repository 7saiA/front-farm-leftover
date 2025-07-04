import {type AppDispatch, store} from "../app/store";
import {refreshAccessToken} from "../features/auth/authThunks.ts";

export async function fetchWithAuth(
    input: RequestInfo,
    init: RequestInit = {},
    dispatch: AppDispatch,
    retry = true
): Promise<Response> {
    const token = store.getState().auth.token;

    const headers = {
        ...(init.headers instanceof Headers
            ? Object.fromEntries(init.headers.entries())
            : init.headers || {}),
        Authorization: `Bearer ${token}`,
    };

    const response = await fetch(input, { ...init, headers });

    if (response.status === 401 && retry) {
        try {
            const newToken = await dispatch(refreshAccessToken()).unwrap();

            const retryHeaders = {
                ...(init.headers instanceof Headers
                    ? Object.fromEntries(init.headers.entries())
                    : init.headers || {}),
                Authorization: `Bearer ${newToken}`,
            };

            return fetch(input, { ...init, headers: retryHeaders });
        } catch {
            return response;
        }
    }

    return response;
}