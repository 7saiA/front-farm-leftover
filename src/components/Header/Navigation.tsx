import "./Navigation.css";
import { Link } from "react-router-dom";

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Farms', path: '/farms' },
];

const Navigation = () => {
    return (
        <nav className="navigation">
            <ul className="nav-list">
                {navItems.map(({ label, path }) => (
                    <li key={label}>
                        <Link to={path} className="nav-button-link">
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;