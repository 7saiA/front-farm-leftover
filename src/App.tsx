import './App.css'
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import Main from "./components/Main/Main.tsx";

function App() {

  return (
    <BrowserRouter>
            <Header/>
            <Main/>
    </BrowserRouter>
  )
}

export default App
