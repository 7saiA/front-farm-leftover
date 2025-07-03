import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useState} from "react";
import {loginUser} from "../../../features/authSlice.ts";
import {changePage} from "../../../features/pageSlice.ts";
import {navItems} from "../../../utils/constants.ts";
import {buttonBaseClass, inputClass} from "../../../utils/styles.ts";

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
        <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-3xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Sign In</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input
                    name="login"
                    placeholder="Username or Email"
                    value={formData.login}
                    onChange={handleChange}
                    required
                    autoComplete="username"
                    className={inputClass}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    className={inputClass}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`${buttonBaseClass} mt-6 text-white ${
                        loading
                            ? "bg-yellow-300 cursor-not-allowed"
                            : "bg-yellow-400 hover:bg-yellow-500 active:scale-[0.98]"
                    }`}
                >
                    {loading ? "Logging in..." : "Sign In"}
                </button>

                {error && (
                    <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>
                )}
            </form>
        </div>
    );
}

export default Login;