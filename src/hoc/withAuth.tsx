import {type ComponentType, useEffect} from "react";
import {useSelector} from "react-redux";
import type {RootState} from "../app/store.ts";
import {useLocation, useNavigate} from "react-router-dom";
import Home from "../components/home/Home.tsx";

type RedirectState = {
    from: string;
    reason?: 'session_expired' | 'unauthorized' | 'login_required';
};

export const withAuth = <T extends object>(Component: ComponentType<T>) => {
    return function AuthenticatedComponent(props: T) {
        const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
        const navigate = useNavigate();
        const location = useLocation();

        useEffect(() => {
            if (!isAuthenticated && location.pathname !== '/sign-in') {
                navigate('/sign-in', {
                    state: {
                        from: location.pathname,
                        reason: 'session_expired'
                    } satisfies RedirectState,
                    replace: true
                });
            }
        }, []);

        if (!isAuthenticated) {
            return <Home/>;
        }

        return <Component {...props} />;
    }
}