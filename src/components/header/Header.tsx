import { UserCircleIcon } from '@heroicons/react/24/solid';

const Header = () => {
    return (
        <header className="bg-white shadow-md sticky top-0">
            <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
                <div className="flex items-center space-x-12">
                    <a href="/" className="text-2xl font-bold text-gray-800 hover:text-green-500 transition-colors duration-300 no-underline">
                        LeftOver
                    </a>
                    <ul className="flex space-x-8">
                        <li>
                            <a href="/products" className="text-gray-800 hover:text-green-500 transition-colors duration-300 no-underline">
                                Products
                            </a>
                        </li>
                        <li>
                            <a href="/farms" className="text-gray-800 hover:text-green-500 transition-colors duration-300 no-underline">
                                Farms
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="text-gray-800 hover:text-green-500 transition-colors duration-300 no-underline">
                                Contact
                            </a>
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

                <div className="ml-6">
                    <a href="/profile">
                        <UserCircleIcon className="w-10 h-10 text-gray-500 hover:text-green-600" />
                    </a>
                </div>
            </nav>
        </header>


    );
};

export default Header;