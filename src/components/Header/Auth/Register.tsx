import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import {registerUser} from "../../../features/auth/authThunks.ts";
import {buttonBaseClass, inputClass} from "../../../utils/styles.ts";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error } = useAppSelector((state) => state.auth);

    const [isFarmer, setIsFarmer] = useState(false);

    const [formData, setFormData] = useState({
        login: "",
        email: "",
        password: "",
        phone: "",
        farmName: "",
        city: "",
        street: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // формируем данные для отправки
        const dataToSend = isFarmer
            ? { ...formData, isFarmer: true }
            : {
                login: formData.login,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                isFarmer: false,
            };

        dispatch(registerUser(dataToSend))
            .unwrap()
            .then(() => navigate("/profile"))
            .catch((err) => console.error("Registration failed", err));
    };

    return (
        <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-3xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Register</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input
                    name="login"
                    placeholder="Name"
                    value={formData.login}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    className={inputClass}
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    className={inputClass}
                />
                <input
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    className={inputClass}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    className={inputClass}
                />

                {!isFarmer ? (
                    <button
                        type="button"
                        onClick={() => setIsFarmer(true)}
                        className="self-start px-6 py-2 text-yellow-600 font-semibold border-2 border-yellow-400 rounded-full hover:bg-yellow-50 transition"
                    >
                        Up to Farm
                    </button>
                ) : (
                    <>
                        <input
                            name="farmName"
                            placeholder="Farm Name"
                            value={formData.farmName}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            className={inputClass}
                        />
                        <input
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            className={inputClass}
                        />
                        <input
                            name="street"
                            placeholder="Street"
                            value={formData.street}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            className={inputClass}
                        />

                        <button
                            type="button"
                            onClick={() => setIsFarmer(false)}
                            className="self-start mt-2 px-6 py-2 text-gray-600 font-semibold border-2 border-gray-300 rounded-full hover:bg-gray-100 transition"
                        >
                            Be a normal Guy
                        </button>
                    </>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`${buttonBaseClass} mt-6 text-white ${
                        loading
                            ? "bg-yellow-300 cursor-not-allowed"
                            : "bg-yellow-400 hover:bg-yellow-500 active:scale-[0.98]"
                    }`}
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                {error && (
                    <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>
                )}
            </form>
        </div>
    );
};

export default Register;