import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/home/Home.tsx";
import Products from "./components/products/Products.tsx";
import Header from "./components/header/Header.tsx";
import Farms from "./components/farms/Farms.tsx";
import Footer from "./components/footer/Footer.tsx";
import SignIn from "./components/sing-in/SignIn.tsx";
import Register from "./components/register/Register.tsx";
import FarmPage from "./components/farms/FarmPage.tsx";
import SearchResultPage from "./components/search-result/SearchResultPage.tsx";
import Profile from "./components/profile/Profile.tsx";
import Cart from "./components/cart/Cart.tsx";
import Orders from "./components/orders/Orders.tsx";
import OrderInfo from "./components/orders/OrderInfo.tsx";
import PayPalSuccess from "./components/paypal/PayPalSuccess.tsx";


function App() {

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/*" element={<Home/>}/>
                <Route path={"/products"} element={<Products/>}/>
                <Route path={"/farms"} element={<Farms/>}/>
                <Route path={"/sign-in"} element={<SignIn/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/farm/:farmName"} element={<FarmPage/>}/>
                <Route path={"/search"} element={<SearchResultPage/>}/>
                <Route path={"/profile"} element={<Profile/>}/>
                <Route path={"/cart"} element={<Cart/>}/>
                <Route path={'/orders'} element={<Orders/>}/>
                <Route path={'/orders/:orderId'} element={<OrderInfo/>}/>
                <Route path="/paypal-success" element={<PayPalSuccess/>} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default App
