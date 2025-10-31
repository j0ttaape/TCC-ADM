import './index.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CadastrarAdm() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nome || !email || !senha) {
            alert('Preencha todos os campos');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.put('http://localhost:5010/pedirPermissao', {
                nome,
                email,
                senha
            });
            alert(response.data.mensagem);
            navigate('/login');
        } catch (error) {
            const errorMessage = error.response?.data?.erro || error.message || 'Erro ao cadastrar';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className='container-cadastrar-adm'>
            <div className='cadastrar-adm'>
                <h2>Cadastrar Adm</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
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
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>
                <Link to={'/login'}>Já tem conta? Faça login</Link>
            </div>
        </div>
    )
}
