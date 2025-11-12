import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './index.scss'
import "/src/index.scss"
import { FaHome, FaPlusCircle, FaSearch, FaUsers, FaCalendarCheck, FaChartLine, FaCog, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    if (window.confirm("Deseja realmente sair?")) {
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div className={`header-container ${isOpen ? 'open' : ''}`}>

        <section className='container-sessoes'>

            <div className='logo'>

            <img src="/assets/image/logoTcc.webp" alt="" height={'70px'} />
            <p>Doe vida</p>
            </div>

            <div className={`botoes ${isActive('/CadastrarHemo') ? 'active' : ''}`} onClick={() => setIsOpen(false)}>

            <Link to={'/CadastrarHemo'}><FaPlusCircle className="icon" /> Cadastrar Hemocentro</Link>

            </div>

            <div className={`botoes ${isActive('/Buscarhemo') ? 'active' : ''}`} onClick={() => setIsOpen(false)}>

            <Link to={'/Buscarhemo'}><FaSearch className="icon" /> Buscar Hemocentro</Link>

            </div>

            <div className={`botoes ${isActive('/GerenciarDoadores') ? 'active' : ''}`} onClick={() => setIsOpen(false)}>

            <Link to={'/GerenciarDoadores'}><FaUsers className="icon" /> Gerenciar Doadores</Link>

            </div>

              
            
            <div className={`botoes ${isActive('/RelatorioGeral') ? 'active' : ''}`} onClick={() => setIsOpen(false)}>

            <Link to={'/RelatorioGeral'}><FaChartLine className="icon" /> Relatórios Geral</Link>

            </div>
            
            <div className={`botoes ${isActive('/permissoes') ? 'active' : ''}`} onClick={() => setIsOpen(false)}>

            <Link to={'/permissoes'}> Permissões</Link>

            </div>

            <div className="botoes logout" onClick={() => { handleLogout(); setIsOpen(false); }}>

            <FaSignOutAlt className="icon" /> Sair

            </div>

         </section>
    </div>
    </>
  )
}
