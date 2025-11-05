import { Link, useLocation, useNavigate } from 'react-router-dom';
import './index.scss'
import "/src/index.scss"
import { FaHome, FaPlusCircle, FaSearch, FaUsers, FaCalendarCheck, FaChartLine, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    if (window.confirm("Deseja realmente sair?")) {
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  return (
    <div className="header-container">

        <section className='container-sessoes'>

            <div className='logo'>

            <img src="/assets/image/logoTcc.webp" alt="" height={'70px'} />
            <p>Doe vida</p>
            </div>

            <div className={`botoes ${isActive('/inicio') ? 'active' : ''}`}>

            <Link to={'/inicio'}><FaHome className="icon" />  Inicio</Link>

            </div>

            <div className={`botoes ${isActive('/CadastrarHemo') ? 'active' : ''}`}>

            <Link to={'/CadastrarHemo'}><FaPlusCircle className="icon" /> Cadastrar Hemocentro</Link>

            </div>

            <div className={`botoes ${isActive('/Buscarhemo') ? 'active' : ''}`}>

            <Link to={'/Buscarhemo'}><FaSearch className="icon" /> Buscar Hemocentro</Link>

            </div>

            <div className={`botoes ${isActive('/GerenciarDoadores') ? 'active' : ''}`}>

            <Link to={'/GerenciarDoadores'}><FaUsers className="icon" /> Gerenciar Doadores</Link>

            </div>

              
            

            <div className={`botoes ${isActive('/RelatorioGeral') ? 'active' : ''}`}>

            <Link to={'/RelatorioGeral'}><FaChartLine className="icon" /> Relatórios Geral</Link>

            </div>

            <div className={`botoes ${isActive('/Configuracao') ? 'active' : ''}`}>

            <Link to={'/Configuracao'}><FaCog className="icon" /> Configurações</Link>

            </div>

            <div className="botoes logout" onClick={handleLogout}>

            <FaSignOutAlt className="icon" /> Sair

            </div>

         </section>
    </div>


  )
}
