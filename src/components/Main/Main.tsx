import Products from "../Products/Products.tsx";
import Home from "../Home/Home.tsx";
import {navItems} from "../../utils/constants.ts";
import {useAppSelector} from "../../app/hooks.ts";

const Main = () => {
    const page = useAppSelector((state) => state.page.currentPage);

    switch (page) {
        case navItems[1]:
            return <Products/>
        default:
            return <Home/>;
    }
};

export default Main;