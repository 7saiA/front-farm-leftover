import Products from "../Products/Products.tsx";
import Home from "../Home/Home.tsx";
import {navItems} from "../../utils/constants.ts";

interface Props {
    page: string;
}

const Main = ({page}: Props) => {
    switch (page) {
        case navItems[1]:
            return <Products/>
        default:
            return <Home/>;
    }
};

export default Main;