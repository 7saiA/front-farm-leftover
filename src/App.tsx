import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import Home from "./components/Home/Home.tsx";
import Products from "./components/Products/Products.tsx";
import Register from "./components/Header/Auth/Register.tsx";
import Login from "./components/Header/Auth/Login.tsx";
import Profile from "./components/Profile/Profile.tsx";
import MyFarm from "./components/My Farm/MyFarm.tsx";
import Farms from "./components/Farms/Farms.tsx";
import FarmDetails from "./components/Farms/FarmDetails.tsx";

function App() {

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products/>}/>
                <Route path="/farms" element={<Farms/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/my-farm" element={<MyFarm/>}/>
                <Route path="/farms/:login" element={<FarmDetails/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
