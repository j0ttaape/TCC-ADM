import { BrowserRouter, Routes, Route } from "react-router-dom";
import Permissoes from "./pages/permissao/index.jsx";
import CadastrarHemo from "./pages/cadastrarHemo/index.jsx";
import Buscarhemo from "./pages/buscarHemo/index.jsx";
import GerenciarDoadores from "./pages/gerenciarDoadores/index.jsx";
import RelatorioGeral from "./pages/relatoriogeral/index.jsx"
import Configuracao from "./pages/configuracao/index.jsx"
import Login from "./pages/login/index.jsx";
import CadastrarAdm from "./pages/cadastrarAdm/index.jsx";
import EditarHemocentro from "./pages/editarHemocentro/index.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";



export default function Navegação(){

    return(
        <BrowserRouter>
        <Routes>

            <Route path="/" element={<Login/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/CadastrarAdm" element={<CadastrarAdm/>}/>
            <Route path="/permissoes" element={<ProtectedRoute><Permissoes/></ProtectedRoute>}/>
            <Route path="/CadastrarHemo" element={<ProtectedRoute><CadastrarHemo/></ProtectedRoute>}/>
            <Route path="/Buscarhemo" element={<ProtectedRoute><Buscarhemo/></ProtectedRoute>}/>
            <Route path="/GerenciarDoadores" element={<ProtectedRoute><GerenciarDoadores/></ProtectedRoute>}/>
            <Route path="/RelatorioGeral" element={<ProtectedRoute><RelatorioGeral/></ProtectedRoute>}/>
            <Route path="/Configuracao" element={<ProtectedRoute><Configuracao/></ProtectedRoute>}/>
            <Route path="/EditarHemocentro" element={<ProtectedRoute><EditarHemocentro/></ProtectedRoute>}/>
          


        </Routes>
        </BrowserRouter>

    )
}
