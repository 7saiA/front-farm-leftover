import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useState} from "react";
import {loginUser} from "../../../features/authSlice.ts";
import {changePage} from "../../../features/pageSlice.ts";
import {navItems} from "../../../utils/constants.ts";

const Login = () => {
    const dispatch = useAppDispatch();
    const {loading, error} = useAppSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        login: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
                [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser(formData))
            .unwrap()
            .then(() => dispatch(changePage(navItems[5])))
            .catch((err) => console.error("Login failed", err));
    };

    return (
        <div className="register-form">
            <h2>Sing in</h2>
            <form onSubmit={handleSubmit}>
                <input
                name="login"
                placeholder="Login"
                value={formData.login}
                onChange={handleChange}
                required
                autoComplete="off"
                />
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Sing In"}
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    )
}

export default Login;