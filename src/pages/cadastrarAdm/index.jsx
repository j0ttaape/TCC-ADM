import './index.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CadastrarAdm() {
    return(
        <div className='container-cadastrar-adm'>
            <div className='cadastrar-adm'>
                <h2>Cadastrar Adm</h2>
                <form>
                    <input type="text" placeholder="Login" />
                    <input type="password" placeholder="Senha" />
                    <button type="submit">Entrar</button>
                </form>
                <Link to={'/CadastrarHemo'}>Cadastrar</Link>
            </div>
        </div>
    )
}