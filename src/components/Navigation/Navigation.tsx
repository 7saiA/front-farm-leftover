import {navItems} from "../../utils/constants.ts";
import NavItem from "./NavItem.tsx";

const Navigation = () => {
    return (
        <nav className={`fixed top-1 left-10`}>
            <ul className={`flex space-x-4`}>
                {navItems.map((item: string) => <NavItem key={item} itemTitle={item} />)}
            </ul>
        </nav>
    );
};

export default Navigation;