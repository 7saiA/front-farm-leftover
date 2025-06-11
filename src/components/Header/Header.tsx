import Navigation from "../Navigation/Navigation.tsx";

const Header = () => {
    return (
        <header className={`bg-grey-color rounded-t-bg`}>
            <Navigation/>
            <h1 className={`text-[3em] text-center py-[0.5em]`}>Left not Over</h1>
        </header>
    );
};

export default Header;