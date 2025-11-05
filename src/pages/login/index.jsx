import './index.scss'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !senha) {
            alert('Preencha todos os campos');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5010/loginAdm', {
                email,
                senha
            });
            localStorage.setItem('token', response.data.token);
            alert('Login realizado com sucesso!');
            navigate('/CadastrarHemo');
        } catch (error) {
            const errorMessage = error.response?.data?.erro || error.message || 'Erro ao fazer login';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container-login'>
            <div className='login'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
                <Link to={'/cadastrarAdm'}>Não tem conta? Cadastre-se</Link>
            </div>
        </div>
    )
}
