import Navigation from "../Navigation/Navigation.tsx";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <Navigation />
            <div className="header-title-container">
                <h1 className="header-title">Left(not)Over</h1>
            </div>
        </header>
    );
};

export default Header;