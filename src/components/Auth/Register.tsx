import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registerUser } from "../../features/authSlice";
import "./Register.css";

const Register = () => {
    const dispatch = useAppDispatch();
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
        // Здесь можно отправлять formData + флаг isFarmer
        dispatch(registerUser(formData));
    };

    return (
        <div className="register-form">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input name="login" placeholder="Name" value={formData.login} onChange={handleChange} required />
                <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
                <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                <input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} required />

                {!isFarmer && (
                    <button type="button" onClick={() => setIsFarmer(true)} style={{ marginBottom: "1rem" }}>
                        Up to Farm
                    </button>
                )}

                {isFarmer && (
                    <>
                        <input name="farmName" placeholder="Farm Name" value={formData.farmName} onChange={handleChange} required />
                        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                        <input name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />

                        <button type="button" onClick={() => setIsFarmer(false)} style={{ marginBottom: "1rem", marginRight: "1rem" }}>
                            Be a normal Guy
                        </button>
                    </>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
};

export default Register;