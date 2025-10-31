import { Link } from 'react-router-dom';
import './index.scss'
import "/src/index.scss"
import { FaHome, FaPlusCircle, FaSearch, FaUsers, FaCalendarCheck, FaChartLine, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function Header() {

  return (
    <div className="header-container">

        <section className='container-sessoes'>

            <div className='logo'>

            <img src="/assets/image/logoTcc.webp" alt="" height={'70px'} />
            <p>Doe vida</p>
            </div>

            <div className="botoes">  

            <Link to={'/inicio'}><FaHome className="icon" />  Inicio</Link>

            </div>

            <div className="botoes">

            <Link to={'/CadastrarHemo'}><FaPlusCircle className="icon" /> Cadastrar Hemocentro</Link>

            </div>

            <div className="botoes">

            <Link to={'/Buscarhemo'}><FaSearch className="icon" /> Buscar Hemocentro</Link>

            </div>

            <div className="botoes">

            <Link to={'/GerenciarDoadores'}><FaUsers className="icon" /> Gerenciar Doadores</Link>

            </div>

            <div className="botoes">

            <Link to={'/Agendamentos'}><FaCalendarCheck className="icon" /> Agendamentos</Link>

            </div>

            <div className="botoes">

            <Link to={'/RelatorioGeral'}><FaChartLine className="icon" /> Relatórios Geral</Link>

            </div>

            <div className="botoes">

            <Link to={'/Configuracao'}><FaCog className="icon" /> Configurações</Link>

            </div>

         </section>
    </div>


  )
}
