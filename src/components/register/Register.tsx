import { useState } from 'react';
import { useRegisterMutation } from '../../service/authApi.ts';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [isFarmForm, setIsFarmForm] = useState(false);
    const [formData, setFormData] = useState({
        login: '',
        userName: '',
        password: '',
        email: '',
        phone: '',
        farmName: '',
        city: '',
        street: ''
    });

    const [registerUser, { isLoading, error }] = useRegisterMutation();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = isFarmForm ? {
            login: formData.login,
            password: formData.password,
            email: formData.email,
            phone: formData.phone,
            farmName: formData.farmName,
            city: formData.city,
            street: formData.street
        } : {
            login: formData.login,
            userName: formData.userName,
            password: formData.password,
            email: formData.email,
            phone: formData.phone,
        };

        try {
            await registerUser(userData).unwrap();
            navigate('/');
        } catch (err) {
            console.error('Registration failed:', err);
        }
    };

    if (isLoading) {
        return (
            <div className="grid place-items-center h-screen">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        const errorMessage = 'status' in error
            ? (error.data as { message?: string })?.message || 'Registration failed'
            : 'Registration failed';

        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-2xl font-bold text-red-500 animate-pulse">
                    Error: {errorMessage}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {isFarmForm ? 'Farm Registration' : 'User Registration'}
                    </h2>
                </div>

                <div className="flex justify-center space-x-4">
                    <button
                        onClick={() => setIsFarmForm(false)}
                        className={`px-4 py-2 rounded-md ${!isFarmForm ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                    >
                        User
                    </button>
                    <button
                        onClick={() => setIsFarmForm(true)}
                        className={`px-4 py-2 rounded-md ${isFarmForm ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                    >
                        Farm
                    </button>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                name="login"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Login"
                                value={formData.login}
                                onChange={handleChange}
                            />
                        </div>
                        {!isFarmForm && (
                            <div>
                                <input
                                    name="userName"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                    placeholder="Nickname"
                                    value={formData.userName}
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                        <div>
                            <input
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                            />
                        </div>
                        <div>
                            <input
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input
                                name="phone"
                                type="tel"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        {isFarmForm && (
                            <>
                                <div>
                                    <input
                                        name="farmName"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                        placeholder="Farm Name"
                                        value={formData.farmName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="city"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="street"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                        placeholder="Street"
                                        value={formData.street}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/sign-in" className="font-medium text-green-600 hover:text-green-500">
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;