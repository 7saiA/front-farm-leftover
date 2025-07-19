const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 py-6 mt-12">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

                <div className="text-sm font-medium">
                    © {new Date().getFullYear()} LeftOver. All rights reserved.
                </div>

                <div className="flex space-x-6 text-sm">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition">
                        Instagram
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition">
                        Twitter
                    </a>
                    <a href="/privacy" className="hover:text-green-600 transition">
                        Privacy
                    </a>
                    <a href="/terms" className="hover:text-green-600 transition">
                        Terms
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;