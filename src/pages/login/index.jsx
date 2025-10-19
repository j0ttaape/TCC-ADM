import './index.scss'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    return (
        <div className='container-login'>
            <div className=' login'>
                <h2>Login</h2>
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