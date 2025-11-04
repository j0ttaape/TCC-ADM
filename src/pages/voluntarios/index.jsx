import { useEffect, useState } from 'react';
import Header from '../../components/header/index.jsx';
import api from '../../app.js';
import './index.scss';

export default function Voluntarios() {
    const [voluntarios, setVoluntarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [editingVoluntario, setEditingVoluntario] = useState(null);
    const [editForm, setEditForm] = useState({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        disponibilidade: '',
        mensagem: ''
    });

    const loadVoluntarios = async (searchQuery = '') => {
        setLoading(true);
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
            setLoading(false);
        }
    };

    useEffect(() => {
        loadVoluntarios();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        loadVoluntarios(query);
    };

    const handleEdit = (voluntario) => {
        setEditingVoluntario(voluntario.id);
        setEditForm({
            nome: voluntario.nome || '',
            email: voluntario.email || '',
            telefone: voluntario.telefone || '',
            cpf: voluntario.cpf || '',
            disponibilidade: voluntario.disponibilidade || '',
            mensagem: voluntario.mensagem || ''
        });
    };

    const handleSaveEdit = async () => {
        try {
            const response = await api.put(`/editarVoluntario/${editingVoluntario}`, editForm);
            alert(response.data.registros);
            setEditingVoluntario(null);
            loadVoluntarios(query);
        } catch (error) {
            console.error('Erro ao editar voluntário:', error);
            alert('Erro ao editar voluntário. Verifique o console.');
        }
    };

    const handleCancelEdit = () => {
        setEditingVoluntario(null);
        setEditForm({
            nome: '',
            email: '',
            telefone: '',
            cpf: '',
            disponibilidade: '',
            mensagem: ''
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este voluntário?')) return;

        try {
            const response = await api.delete(`/deletarVoluntario/${id}`);
            alert(response.data.registros);
            loadVoluntarios(query);
        } catch (error) {
            console.error('Erro ao deletar voluntário:', error);
            alert('Erro ao deletar voluntário. Verifique o console.');
        }
    };

    return (
        <div>
            <Header />
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
                            <button type='submit' className='botao-pesquisar' disabled={loading}>
                                {loading ? 'Carregando...' : 'Buscar'}
                            </button>
                        </div>
                    </form>
                </section>

                <div className='summary'>
                    <h2>Voluntários Cadastrados</h2>
                    <p>Total: {voluntarios.length}</p>
                    <button onClick={() => loadVoluntarios()} disabled={loading}>
                        Atualizar Lista
                    </button>
                </div>

                <section className='container-voluntarios-list'>
                    {loading ? (
                        <p>Carregando voluntários...</p>
                    ) : voluntarios.length === 0 ? (
                        <p>Nenhum voluntário encontrado.</p>
                    ) : (
                        voluntarios.map((voluntario) => (
                            <div key={voluntario.id} className='voluntario-card'>
                                {editingVoluntario === voluntario.id ? (
                                    <div className='edit-form'>
                                        <input
                                            type="text"
                                            placeholder="Nome"
                                            value={editForm.nome}
                                            onChange={(e) => setEditForm({...editForm, nome: e.target.value})}
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={editForm.email}
                                            onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Telefone"
                                            value={editForm.telefone}
                                            onChange={(e) => setEditForm({...editForm, telefone: e.target.value})}
                                        />
                                        <input
                                            type="text"
                                            placeholder="CPF"
                                            value={editForm.cpf}
                                            onChange={(e) => setEditForm({...editForm, cpf: e.target.value})}
                                        />
                                        <textarea
                                            placeholder="Disponibilidade"
                                            value={editForm.disponibilidade}
                                            onChange={(e) => setEditForm({...editForm, disponibilidade: e.target.value})}
                                        />
                                        <textarea
                                            placeholder="Mensagem"
                                            value={editForm.mensagem}
                                            onChange={(e) => setEditForm({...editForm, mensagem: e.target.value})}
                                        />
                                        <div className='botoes-acao'>
                                            <button onClick={handleSaveEdit}>Salvar</button>
                                            <button onClick={handleCancelEdit}>Cancelar</button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <p><strong>Nome:</strong> {voluntario.nome || 'Não informado'}</p>
                                        <p><strong>Email:</strong> {voluntario.email || 'Não informado'}</p>
                                        <p><strong>Telefone:</strong> {voluntario.telefone || 'Não informado'}</p>
                                        <p><strong>CPF:</strong> {voluntario.cpf || 'Não informado'}</p>
                                        <p><strong>Disponibilidade:</strong> {voluntario.disponibilidade || 'Não informado'}</p>
                                        <p><strong>Mensagem:</strong> {voluntario.mensagem || 'Não informado'}</p>
                                        <div className='botoes-acao'>
                                            <button onClick={() => handleEdit(voluntario)}>Editar</button>
                                            <button onClick={() => handleDelete(voluntario.id)}>Excluir</button>
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
