import { useState, useEffect } from 'react';
import Header from '../../components/header/index.jsx';
import './index.scss';
import axios from 'axios';
import api from '../../app.js';

export default function Inicio() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [voluntarios, setVoluntarios] = useState([]);
    const [loadingVoluntarios, setLoadingVoluntarios] = useState(true);
    const [loadingVoluntario, setLoadingVoluntario] = useState(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        carregarPedidos();
        loadVoluntarios();
    }, []);

    const carregarPedidos = async () => {
        try {
            const response = await axios.get('http://localhost:5010/listarPedidos');
            setPedidos(response.data.registros || []);
        } catch (error) {
            console.error('Erro ao carregar pedidos:', error);
            setPedidos([]);
        }
    };

    const loadVoluntarios = async (searchQuery = '') => {
        setLoadingVoluntarios(true);
        try {
            let url = '/listarVoluntarios';
            if (searchQuery.trim()) {
                url = `/pesquisarVoluntario?voluntario=${encodeURIComponent(searchQuery.trim())}`;
            }
            const response = await api.get(url);
            setVoluntarios(response.data);
        } catch (error) {
            console.log(error);
            setVoluntarios([]);
        } finally {
            setLoadingVoluntarios(false);
        }
    };

    const concederPermissao = async (id) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.put('http://localhost:5010/concederPermissao', {
                id_requerido: id
            }, {
                headers: {
                    'x-access-token': token
                }
            });
            alert(response.data.resposta);
            carregarPedidos();
        } catch (error) {
            const errorMessage = error.response?.data?.erro || error.message || 'Erro ao conceder permissão';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const negarPermissao = async (id) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.put('http://localhost:5010/negarPermissao', {
                id_requerido: id
            }, {
                headers: {
                    'x-access-token': token
                }
            });
            alert(response.data.resposta);
            carregarPedidos();
        } catch (error) {
            const errorMessage = error.response?.data?.erro || error.message || 'Erro ao negar permissão';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        loadVoluntarios(query);
    };

    const permitirVoluntario = async (nome) => {
        try {
            setLoadingVoluntario(nome);
            const token = localStorage.getItem('token');
            const response = await api.put('/permitirVoluntario', { nome_voluntario: nome }, {
                headers: {
                    'x-access-token': token
                }
            });
            alert(response.data.resposta);
            loadVoluntarios(query);
        } catch (error) {
            console.error('Erro ao permitir voluntário:', error);
            alert('Erro ao permitir voluntário. Verifique o console.');
        } finally {
            setLoadingVoluntario(null);
        }
    };

    const negarVoluntario = async (nome) => {
        try {
            setLoadingVoluntario(nome);
            const token = localStorage.getItem('token');
            const response = await api.delete('/negarVoluntario', {
                data: { nome_voluntario: nome },
                headers: {
                    'x-access-token': token
                }
            });
            alert(response.data.resposta);
            loadVoluntarios(query);
        } catch (error) {
            console.error('Erro ao negar voluntário:', error);
            alert('Erro ao negar voluntário. Verifique o console.');
        } finally {
            setLoadingVoluntario(null);
        }
    };

    return (
        <div>
            <Header />

            <section className='container-main'>
                <section className='container-header'>
                    <h1>Pedidos para ser Sub-Administrador</h1>
                </section>

                {pedidos.length === 0 ? (
                    <p>Nenhum pedido pendente.</p>
                ) : (
                    <div className='pedidos-list'>
                        {pedidos.map(pedido => (
                            <div key={pedido.id_adm} className='pedido-item'>
                                <h3>{pedido.nome}</h3>
                                <p>Email: {pedido.email}</p>
                                <div className='buttons'>
                                    <button
                                        onClick={() => concederPermissao(pedido.id_adm)}
                                        disabled={loading}
                                    >
                                        {loading ? 'Concedendo...' : 'Conceder Permissão'}
                                    </button>
                                    <button
                                        onClick={() => negarPermissao(pedido.id_adm)}
                                        disabled={loading}
                                        className='negar-btn'
                                    >
                                        {loading ? 'Negando...' : 'Negar Permissão'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <div className='container-voluntarios'>
                <section className='container-header'>
                    <h1>Voluntários</h1>
                </section>

                <section className='container-buscar'>
                    <form onSubmit={handleSearch}>
                        <div className='buscar'>
                            <input
                                type="text"
                                placeholder='Buscar voluntário por nome, email, telefone ou CPF...'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button type='submit' className='botao-pesquisar' disabled={loadingVoluntarios}>
                                {loadingVoluntarios ? 'Carregando...' : 'Buscar'}
                            </button>
                        </div>
                    </form>
                </section>

                <div className='summary'>
                    <h2>Voluntários Cadastrados</h2>
                    <p>Total: {voluntarios.length}</p>
                    <button onClick={() => loadVoluntarios()} disabled={loadingVoluntarios}>
                        Atualizar Lista
                    </button>
                </div>

                <section className='container-voluntarios-list'>
                    {loadingVoluntarios ? (
                        <p>Carregando voluntários...</p>
                    ) : voluntarios.length === 0 ? (
                        <p>Nenhum voluntário encontrado.</p>
                    ) : (
                        voluntarios.map((voluntario) => (
                            <div key={voluntario.id} className='voluntario-card'>
                                <p><strong>Nome:</strong> {voluntario.nome || 'Não informado'}</p>
                                <p><strong>Email:</strong> {voluntario.email || 'Não informado'}</p>
                                <p><strong>Telefone:</strong> {voluntario.telefone || 'Não informado'}</p>
                                <p><strong>CPF:</strong> {voluntario.cpf || 'Não informado'}</p>
                                <p><strong>Disponibilidade:</strong> {voluntario.disponibilidade || 'Não informado'}</p>
                                <p><strong>Mensagem:</strong> {voluntario.mensagem || 'Não informado'}</p>
                                <div className='botoes-acao'>
                                    <button
                                        onClick={() => permitirVoluntario(voluntario.nome)}
                                        disabled={loadingVoluntario === voluntario.nome}
                                    >
                                        {loadingVoluntario === voluntario.nome ? 'Aprovando...' : 'Aprovar'}
                                    </button>
                                    <button
                                        onClick={() => negarVoluntario(voluntario.nome)}
                                        disabled={loadingVoluntario === voluntario.nome}
                                    >
                                        {loadingVoluntario === voluntario.nome ? 'Negando...' : 'Negar'}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </section>
            </div>
        </div>
    )
}
