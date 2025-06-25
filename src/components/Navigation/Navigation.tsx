import {navItems} from "../../utils/constants.ts";
import NavItem from "./NavItem.tsx";
import "./Navigation.css";

const Navigation = () => {
    return (
        <nav className="navigation">
            <ul className="nav-list">
                {navItems.map((item: string) => (
                    <NavItem key={item} itemTitle={item} />
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;