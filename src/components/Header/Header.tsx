import Navigation from "./Navigation/Navigation.tsx";
import "./Header.css";
import AuthButtons from "./AuthButtons.tsx";
import MyFarmButton from "./MyFarmButton.tsx";
import sunriseLogo from "../../assets/sunriseLogo.jpg";

const Header = () => {
    return (
        <header className="header">
            <Navigation/>
            <div className="header-title-container">
                <h1 className="header-title">
                    Left<img src={sunriseLogo} alt="(not)" className="sunrise-logo"/>Over
                </h1>
            </div>
            <AuthButtons/>
            <div className="my-farm-button-container">
                <MyFarmButton/>
            </div>
        </header>
    );
};

export default Header;