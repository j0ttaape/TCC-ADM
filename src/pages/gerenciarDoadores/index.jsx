import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/index.jsx';
import './index.scss';
import api from '../../app.js';
import { useEffect, useState } from 'react';

export default function GerenciarDoadores(){
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');

    const carregarDoadores = async (e) => {
        if (e) {
            e.preventDefault();
        }
        
        setLoading(true);

        try {
            let url = '/listarDoadores';
            if(query.trim()){
                url = `/BuscarCpf/${encodeURIComponent(query.trim())}`;
            }

            console.log('Fazendo requisição para:', url);
            
            const response = await api.get(url);
            
            console.log('Resposta da API:', response);
            
            // CORREÇÃO: Verificação correta do status
            if (response.status === 200) {
                // CORREÇÃO: Axios retorna dados em response.data
                const data = response.data;
                console.log('Dados recebidos:', data);
                
                setUsers(Array.isArray(data) ? data : [data]);
            } else {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }

        } catch (error) {
            console.error('Erro detalhado ao carregar doadores:', error);
            console.log('Resposta completa do erro:', error.response);
            alert('Erro ao carregar doadores. Verifique o console.');
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        carregarDoadores();
    }, []);

    // Versão alternativa mais simples para teste:
    const carregarDoadoresSimples = async (e) => {
        if (e) e.preventDefault();
        
        setLoading(true);
        try {
            let url = '/listarDoadores';
            if(query.trim()){
                url = `/BuscarCpf/${query.trim()}`;
            }

            console.log('📡 Fazendo requisição para:', url);
            
            // Tentativa mais direta
            const response = await api.get(url);
            console.log('✅ Resposta recebida:', response);
            
            // Se chegou aqui, a requisição foi bem-sucedida
            const data = response.data;
            console.log('📊 Dados:', data);
            
            setUsers(data || []);
            
        } catch (error) {
            console.error('Erro ao carregar doadores:', error);
            if (error.response) {
                console.log('Resposta completa do erro:', error.response);
            }
            alert('Erro: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    }


const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este agendamento?')) return;

    try {
        const response = await api.delete(`/deletarDoadores/${id}`);

        if (response.status === 200) {
            alert('Agendamento deletado com sucesso!');
            // Recarrega a lista após deletar
            carregarDoadoresSimples();
        } else {
            throw new Error(`Erro ${response.status}`);
        }

    } catch (error) {
        console.error('Erro ao deletar agendamento:', error);

        // Debug detalhado
        if (error.response) {
            console.log('Status do erro:', error.response.status);
            console.log('Dados do erro:', error.response.data);
            console.log('Headers do erro:', error.response.headers);
        } else if (error.request) {
            console.log('Não houve resposta da API');
        } else {
            console.log('Erro na configuração:', error.message);
        }

        alert('Erro ao deletar agendamento. Verifique o console.');
    }
}

    return(
        <div>
            <Header />
            <div className='container-genreciarUsers'>
                <section className='container-buscar'>
                    <h1>Gerenciar Doadores</h1>

                    <form onSubmit={carregarDoadoresSimples}>
                        <div className='buscar'>
                            <input 
                                type="text"
                                placeholder='Buscar doador por CPF...'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button 
                                type='submit' 
                                className='botao-pesquisar' 
                                disabled={loading}
                            >
                                {loading ? 'Carregando...' : 'Buscar'}
                            </button>
                        </div>
                    </form>
                </section>

                <div className='summary'>
                    <h2>Doadores Cadastrados</h2>
                    <p>Total: {users.length}</p>
                    <button 
                        onClick={() => carregarDoadoresSimples()}
                        disabled={loading}
                    >
                    </button>
                </div>

                <section className='container-grupos-users'>
                    {loading ? (
                        <p>Carregando doadores...</p>
                    ) : users.length === 0 ? (
                        <p>Nenhum doador encontrado.</p>
                    ) : (
                        users.map((user) => (
                            <div key={user.id || user.cpf} className='grupo'>
                                <p><strong>Nome:</strong> {user.nome_completo || 'Não informado'}</p>
                                <p><strong>CPF:</strong> {user.cpf || 'Não informado'}</p>
                                <p><strong>Tipo Sanguíneo:</strong> {user.tipo_sanguineo || 'Não informado'}</p>
                                <p><strong>Última Doação:</strong> {new Date(user.data_agendamento).toLocaleDateString('pt-BR')}</p>
                                <p><strong>Contato:</strong> {user.telefone || 'Não informado'}</p>
                                <div className='botoes-acao'>
                                    <button >Editar</button>
                                    <button onClick={() => handleDelete(user.id)}>Excluir</button>
                                </div>
                            </div>
                        ))
                    )}
                </section>
            </div>
        </div>
    )
}