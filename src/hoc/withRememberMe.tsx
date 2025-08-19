import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setRememberMe } from '../features/authSlice';
import { useRefreshTokenMutation } from '../service/authApi';
import type {RootState} from "../app/store.ts";
import IsLoading from "../components/is-loading-page/IsLoading.tsx";

export function withRememberMe<T extends Object>(WrappedComponent: React.ComponentType<T>) {
    return function RememberMeWrapper(props: T) {
        const dispatch = useDispatch();
        const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
        const [refresh] = useRefreshTokenMutation();
        const [checked, setChecked] = useState(false);

        useEffect(() => {
            const remembered = localStorage.getItem('rememberMe') === '1';
            const doRefresh = async () => {
                if (remembered && !isAuthenticated) {
                    dispatch(setRememberMe(true));
                    try {
                        await refresh({ remember: "remember" }).unwrap();
                    } catch {
                        // nothing
                    }
                }
                setChecked(true);
            };

            doRefresh();
        }, [dispatch, refresh, isAuthenticated]);

        if (!checked) {
            return <IsLoading/>
        }

        return <WrappedComponent {...props} />;
    };
}