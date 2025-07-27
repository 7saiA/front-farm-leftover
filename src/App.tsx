import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home.tsx";
import Products from "./components/products/Products.tsx";
import Header from "./components/header/Header.tsx";
import Farms from "./components/farms/Farms.tsx";
import Footer from "./components/footer/Footer.tsx";
import SignIn from "./components/sing-in/SignIn.tsx";
import Register from "./components/register/Register.tsx";
import FarmPage from "./components/farm-page/FarmPage.tsx";
import SearchResultPage from "./components/search-result/SearchResultPage.tsx";


function App() {

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/*" element={<Home />} />
                <Route path={"/products"} element={<Products/>} />
                <Route path={"/farms"} element={<Farms />} />
                <Route path={"/sign-in"} element={<SignIn/>} />
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/farms/:farmId"} element={<FarmPage/>}/>
                <Route path={"/search"} element={<SearchResultPage/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default App
