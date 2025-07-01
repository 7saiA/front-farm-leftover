import Products from "../Products/Products.tsx";
import Home from "../Home/Home.tsx";
import {navItems} from "../../utils/constants.ts";
import {useAppSelector} from "../../app/hooks.ts";
import Register from "../Header/Auth/Register.tsx";
import Login from "../Header/Auth/Login.tsx";
import Profile from "../Profile/Profile.tsx";
import MyFarm from "../My Farm/MyFarm.tsx";

const Main = () => {
    const page = useAppSelector((state) => state.page.currentPage);

    switch (page) {
        case navItems[1]:
            return <Products/>
        case navItems[3]:
            return <Register/>
        case navItems[4]:
            return <Login/>
        case navItems[5]:
            return <Profile/>
        case navItems[6]:
            return <MyFarm/>
        default:
            return <Home/>;
    }
};

export default Main;