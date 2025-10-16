import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/inicio/index.jsx";
import CadastrarHemo from "./pages/cadastrarHemo/index.jsx";
import Buscarhemo from "./pages/buscarHemo/index.jsx";      
import GerenciarDoadores from "./pages/gerenciarDoadores/index.jsx";
import Agendamementos from "./pages/agendamentos/index.jsx"
import RelatorioGeral from "./pages/relatoriogeral/index.jsx"
import Configuracao from "./pages/configuracao/index.jsx"


export default function Navegação(){

    return(
        <BrowserRouter>
        <Routes>

            <Route path="/" element={<Inicio/>}/>
            <Route path="/CadastrarHemo" element={<CadastrarHemo/>}/>
            <Route path="/Buscarhemo" element={<Buscarhemo/>}/>
            <Route path="/GerenciarDoadores" element={<GerenciarDoadores/>}/>
            <Route path="/Agendamentos" element={<Agendamementos/>}/>
            <Route path="/RelatorioGeral" element={<RelatorioGeral/>}/>
            <Route path="/Configuracao" element={<Configuracao/>}/>

        </Routes>
        </BrowserRouter>

    )
}
