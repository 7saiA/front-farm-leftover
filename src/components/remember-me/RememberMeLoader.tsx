import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRememberMe } from '../../features/authSlice';
import { useRefreshTokenMutation } from '../../service/authApi';

const RememberMeLoader = () => {
    const dispatch = useDispatch();
    const [refresh] = useRefreshTokenMutation();

    useEffect(() => {
        const remembered = localStorage.getItem('rememberMe') === '1';
        if (!remembered) return;

        dispatch(setRememberMe(true));

        (async () => {
            try {
                await refresh({remember: "remember"}).unwrap();
            } catch {
                //nothing
            }
        })();
    }, [dispatch, refresh]);

    return null;
};

export default RememberMeLoader;