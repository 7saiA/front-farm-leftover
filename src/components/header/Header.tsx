import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSignIn = () => {
        navigate('/sign-in');
        setIsMenuOpen(false);
    };

    const handleRegister = () => {
        navigate('/register');
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-white shadow-md sticky top-0">
            <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
                <div className="flex items-center space-x-12">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-gray-800 hover:text-green-500 transition-color duration-300 no-underline"
                    >
                        LeftOver
                    </Link>
                    <ul className="flex space-x-8">
                        <li>
                            <Link
                                to="/products"
                                className="text-gray-800 hover:text-green-500 transition-colors duration-300 no-underline"
                            >
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/farms"
                                className="text-gray-800 hover:text-green-500 transition-colors duration-300 no-underline"
                            >
                                Farms
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="text-gray-800 hover:text-green-500 transition-colors duration-300 no-underline"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="flex-1 px-8 max-w-md">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="ml-6 relative">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <UserCircleIcon className="w-10 h-10 text-gray-500 hover:text-green-600"/>
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                            <button
                                onClick={handleSignIn}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={handleRegister}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                            >
                                Register
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;