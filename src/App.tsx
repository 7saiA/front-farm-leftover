import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home.tsx";
import Products from "./components/products/Products.tsx";
import Header from "./components/header/Header.tsx";
import Farms from "./components/farms/Farms.tsx";
import Footer from "./components/footer/Footer.tsx";


function App() {

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/*" element={<Home />} />
                <Route path={"/products"} element={<Products/>} />
                <Route path={"/farms"} element={<Farms />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default App
