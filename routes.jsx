import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./src/pages/inicio/index.jsx";
import Hemocentros from "./src/pages/hemocentros/index.jsx";
import Doadores from "./src/pages/doadores/index.jsx";

export default function Navegação(){

    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Inicio/>}/>
            <Route path="/hemocentros" element={<Hemocentros/>}/>
            <Route path="/doadores" element={<Doadores/>}/>
        </Routes>
        </BrowserRouter>

    )
}
