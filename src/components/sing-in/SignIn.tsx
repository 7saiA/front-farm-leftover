import { useState } from 'react';
import {useLogoutMutation, useRefreshTokenMutation, useSignInMutation} from '../../service/authApi';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });

    const [loginUser, { isLoading, error }] = useSignInMutation();
    const [refreshToken] = useRefreshTokenMutation();
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await loginUser({
                login: formData.login,
                password: formData.password
            }).unwrap();

            navigate('/');
        } catch (err) {
            console.error('Login failed:', err);
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
            ? (error.data as { message?: string })?.message || 'Login failed'
            : 'Login failed';

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
                        Sign in to your account
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                name="login"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                                value={formData.login}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="/forgot-password" className="font-medium text-green-600 hover:text-green-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={async () => {
                            try {
                                const response = await refreshToken().unwrap();
                                console.log("New access token:", response.accessToken);
                                alert("Refresh successful. Check console.");
                            } catch (err) {
                                console.error("Refresh token failed", err);
                                alert("Refresh failed");
                            }
                        }}
                        className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                        Test Refresh Token
                    </button>
                </div>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={async () => {
                            try {
                                await logout().unwrap();
                                console.log("Logged out successfully");
                                alert("Logout successful.");
                                // optionally redirect after logout
                                navigate('/sign-in');
                            } catch (err) {
                                console.error("Logout failed", err);
                                alert("Logout failed");
                            }
                        }}
                        className="mt-4 text-sm font-medium text-red-600 hover:text-red-500"
                    >
                        Logout
                    </button>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="/register" className="font-medium text-green-600 hover:text-green-500">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;