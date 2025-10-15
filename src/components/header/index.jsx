import { Link } from 'react-router-dom';
import './index.scss'
import { FaHome, FaPlusCircle, FaSearch, FaUsers, FaCalendarCheck, FaChartLine, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function Header(){

    return(
           <div className="sidebar">
      <div className="nav-item active">
        <FaHome className="icon" /> Dashboard
      </div>
      <div className="nav-item">
        <FaPlusCircle className="icon" /> Cadastrar Hemocentro
      </div>
      <div className="nav-item">
        <FaSearch className="icon" /> Buscar Hemocentro
      </div>
      <div className="nav-item">
        <FaUsers className="icon" /> Gerenciar Doadores
      </div>
      <div className="nav-item">
        <FaCalendarCheck className="icon" /> Agendamentos
      </div>
      <div className="nav-item">
        <FaChartLine className="icon" /> Relatórios
      </div>
      <div className="nav-item">
        <FaCog className="icon" /> Configurações
      </div>
      <div className="nav-item">
        <FaSignOutAlt className="icon" /> Sair
      </div>
    </div>
            
   
    )
}
