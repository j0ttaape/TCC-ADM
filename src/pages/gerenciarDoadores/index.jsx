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
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({ nome_completo: '', telefone: '', tipo_sanguineo: '' });

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


const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditForm({
        nome_completo: user.nome_completo || '',
        telefone: user.telefone || '',
        tipo_sanguineo: user.tipo_sanguineo || ''
    });
};

const handleSaveEdit = async () => {
    try {
        const response = await api.put(`/editarDoadores/${editingUser}`, editForm);
        if (response.status === 200) {
            alert('Doador editado com sucesso!');
            setEditingUser(null);
            carregarDoadoresSimples();
        }
    } catch (error) {
        console.error('Erro ao editar doador:', error);
        alert('Erro ao editar doador. Verifique o console.');
    }
};

const handleCancelEdit = () => {
    setEditingUser(null);
    setEditForm({ nome_completo: '', telefone: '', tipo_sanguineo: '' });
};

const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este doador?')) return;

    try {
        const response = await api.delete(`/deletarDoadores/${id}`);

        if (response.status === 200) {
            alert('Doador deletado com sucesso!');
            // Recarrega a lista após deletar
            carregarDoadoresSimples();
        } else {
            throw new Error(`Erro ${response.status}`);
        }

    } catch (error) {
        console.error('Erro ao deletar doador:', error);

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

        alert('Erro ao deletar doador. Verifique o console.');
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
                                {editingUser === user.id ? (
                                    <div className='edit-form'>
                                        <input
                                            type="text"
                                            placeholder="Nome completo"
                                            value={editForm.nome_completo}
                                            onChange={(e) => setEditForm({...editForm, nome_completo: e.target.value})}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Telefone"
                                            value={editForm.telefone}
                                            onChange={(e) => setEditForm({...editForm, telefone: e.target.value})}
                                        />
                                        <select
                                            value={editForm.tipo_sanguineo}
                                            onChange={(e) => setEditForm({...editForm, tipo_sanguineo: e.target.value})}
                                        >
                                            <option value="">Selecione o tipo sanguíneo</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                        <div className='botoes-acao'>
                                            <button onClick={handleSaveEdit}>Salvar</button>
                                            <button onClick={handleCancelEdit}>Cancelar</button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <p><strong>Nome:</strong> {user.nome_completo || 'Não informado'}</p>
                                        <p><strong>CPF:</strong> {user.cpf || 'Não informado'}</p>
                                        <p><strong>Tipo Sanguíneo:</strong> {user.tipo_sanguineo || 'Não informado'}</p>
                                        <p><strong>Última Doação:</strong> {user.ultima_doacao ? new Date(user.ultima_doacao).toLocaleDateString('pt-BR') : 'Ainda não doou'}</p>
                                        <p><strong>Próxima Doação:</strong> {user.proxima_doacao ? new Date(user.proxima_doacao).toLocaleDateString('pt-BR') : 'Não tem doação agendada'}</p>
                                        <p><strong>Contato:</strong> {user.telefone || 'Não informado'}</p>
                                        <div className='botoes-acao'>
                                            <button onClick={() => handleEdit(user)}>Editar</button>
                                            <button onClick={() => handleDelete(user.id)}>Excluir</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </section>
            </div>
        </div>
    )
}