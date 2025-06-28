import Products from "../Products/Products.tsx";
import Home from "../Home/Home.tsx";
import {navItems} from "../../utils/constants.ts";
import {useAppSelector} from "../../app/hooks.ts";
import Register from "../Auth/Register.tsx";

const Main = () => {
    const page = useAppSelector((state) => state.page.currentPage);

    switch (page) {
        case navItems[1]:
            return <Products/>
        case navItems[3]:
            return <Register/>
        default:
            return <Home/>;
    }
};

export default Main;