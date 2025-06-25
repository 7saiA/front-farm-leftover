import './App.css'
import {BrowserRouter} from "react-router-dom";
import {useState} from "react";
import {navItems} from "./utils/constants.ts";
import Header from "./components/Header/Header.tsx";
import {FLContext} from "./utils/context.ts";
import Main from "./components/Main/Main.tsx";

function App() {
    const [page, setPage] = useState(navItems[0]);

  return (
    <BrowserRouter>
        <FLContext.Provider value={{changePage: setPage}}>
            <Header/>
            <Main page={page}/>
        </FLContext.Provider>
    </BrowserRouter>
  )
}

export default App
