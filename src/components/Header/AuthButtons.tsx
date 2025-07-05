import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {logout} from "../../features/auth/authSlice.ts";
import {useNavigate} from "react-router-dom";

const AuthButtons = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {token} = useAppSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/home"); // возвращаем на Home
    };

    return (
        <div className="auth-buttons">
            {token ? (
                <>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                    <button onClick={() => navigate("/profile")}>
                        My Profile
                    </button>
                </>
            ) : (
                <>
                    <button onClick={() => navigate("/register")}>
                        Register
                    </button>
                    <button onClick={() => navigate("/login")}>
                        Sign In
                    </button>
                </>
            )}
        </div>
    );
}

export default AuthButtons;