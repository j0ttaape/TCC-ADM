import { useState, useEffect } from 'react';
import Header from '../../components/header/index.jsx';
import './index.scss';
import axios from 'axios';
import api from '../../app.js';

export default function Permissoes() {
    const [pedidos, setPedidos] = useState([]);
    const [pedidosAdm, setPedidosAdm] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingAdm, setLoadingAdm] = useState(false);
    const [voluntarios, setVoluntarios] = useState([]);
    const [loadingVoluntarios, setLoadingVoluntarios] = useState(true);
    const [loadingAprovacao, setLoadingAprovacao] = useState(null);
    const [loadingNegacao, setLoadingNegacao] = useState(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        carregarPedidos();
        carregarPedidosAdm();
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

    const carregarPedidosAdm = async () => {
        try {
            const response = await axios.get('http://localhost:5010/listarPedidosAdm');
            setPedidosAdm(response.data.registros || []);
        } catch (error) {
            console.error('Erro ao carregar pedidos de administrador:', error);
            setPedidosAdm([]);
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

    const concederPermissaoAdm = async (id) => {
        try {
            setLoadingAdm(true);
            const token = localStorage.getItem('token');
            const response = await axios.put('http://localhost:5010/concederPermissaoAdm', {
                id_requerido: id
            }, {
                headers: {
                    'x-access-token': token
                }
            });
            alert(response.data.resposta);
            carregarPedidosAdm();
        } catch (error) {
            const errorMessage = error.response?.data?.erro || error.message || 'Erro ao conceder permissão de administrador';
            alert(errorMessage);
        } finally {
            setLoadingAdm(false);
        }
    };



    const handleSearch = (e) => {
        e.preventDefault();
        loadVoluntarios(query);
    };

    const permitirVoluntario = async (id) => {
        try {
            setLoadingAprovacao(id);
            const token = localStorage.getItem('token');
            const response = await api.put('/permitirVoluntario', { id_voluntario: id }, {
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
            setLoadingAprovacao(null);
        }
    };

    const negarVoluntario = async (id) => {
        try {
            setLoadingNegacao(id);
            const token = localStorage.getItem('token');
            const response = await api.delete('/negarVoluntario', {
                data: { id_voluntario: id },
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
            setLoadingNegacao(null);
        }
    };



    return (
        <div>
            <Header />

            <section className='container-main'>
                <section className='container-header'>
                    <h1>Pedidos para ser Administrador</h1>
                </section>

                {pedidosAdm.length === 0 ? (
                    <p>Nenhum pedido pendente.</p>
                ) : (
                    <div className='pedidos-list'>
                        {pedidosAdm.map(pedido => (
                            <div key={pedido.id_adm} className='pedido-item'>
                                <h3>{pedido.nome}</h3>
                                <p>Email: {pedido.email}</p>
                                <div className='buttons'>
                                    <button
                                        onClick={() => concederPermissaoAdm(pedido.id_adm)}
                                        disabled={loadingAdm}
                                    >
                                        {loadingAdm ? 'Concedendo...' : 'Conceder Permissão'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

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
                                <p><strong>Hemocentro:</strong> {voluntario.nome_hemocentro || 'Não informado'}</p>
                                <p><strong>Disponibilidade:</strong> {voluntario.disponibilidade || 'Não informado'}</p>
                                <p><strong>Mensagem:</strong> {voluntario.mensagem || 'Não informado'}</p>
                                <div className='botoes-acao'>
                                    <button
                                        onClick={() => permitirVoluntario(voluntario.id)}
                                        disabled={loadingAprovacao === voluntario.id}
                                    >
                                        {loadingAprovacao === voluntario.id ? 'Aprovando...' : 'Aprovar'}
                                    </button>
                                    <button
                                        onClick={() => negarVoluntario(voluntario.id)}
                                        disabled={loadingNegacao === voluntario.id}
                                    >
                                        {loadingNegacao === voluntario.id ? 'Negando...' : 'Negar'}
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
