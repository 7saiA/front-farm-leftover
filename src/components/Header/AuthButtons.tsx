import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {changePage} from "../../features/pageSlice.ts";
import {navItems} from "../../utils/constants.ts";
import {logout} from "../../features/authSlice.ts";

const AuthButtons = () => {
    const dispatch = useAppDispatch();
    const {token} = useAppSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(changePage(navItems[0])); // возвращаем на Home
    };

    return (
        <div className="auth-buttons">
            {token ? (
                <>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                    <button onClick={() => dispatch(changePage(navItems[5]))}>
                        My Profile
                    </button>
                </>
            ) : (
                <>
                    <button onClick={() => dispatch(changePage(navItems[3]))}>
                        Register
                    </button>
                    <button onClick={() => dispatch(changePage(navItems[4]))}>
                        Sign In
                    </button>
                </>
            )}
        </div>
    );
}

export default AuthButtons;