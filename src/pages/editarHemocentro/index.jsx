 import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/header/index.jsx';
import './index.scss';
import axios from 'axios';

export default function EditarHemocentro() {
    const location = useLocation();
    const hemoFromState = location.state?.hemo;
    const [selectedHemocentro, setSelectedHemocentro] = useState(hemoFromState || null);
    const [estoque, setEstoque] = useState([]);
    const [activeTab, setActiveTab] = useState('info');
    const [loading, setLoading] = useState(false);
    const [meses,setMeses] = useState([]);
    const [datas,setDatas] = useState([]);
    const [horarios,setHorarios] = useState([]);
    const [mesSelecionado, setMesSelecionado] = useState('');
    const [dataSelecionada, setDataSelecionada] = useState('');
    const [horariosSelecionado,setHorarioSelecionado] = useState('');
    const [voluntarios, setVoluntarios] = useState([]);
    const [editingVoluntario, setEditingVoluntario] = useState(null);
    const [originalVoluntario, setOriginalVoluntario] = useState(null);
    const [editForm, setEditForm] = useState({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        disponibilidade: '',
        mensagem: ''
    });





    const carregarEstoque = async (nome) => {
        console.log('Carregando estoque para:', nome);
        try {
            const response = await axios.get(`http://localhost:5010/listarEstoque/${nome}?t=${Date.now()}`);
            setEstoque(response.data.registros || []);
        } catch (error) {
            console.error('Erro ao carregar estoque:', error);
            setEstoque([]);
        }
    };

    const handleEditarInfo = async (e) => {
        e.preventDefault();
        if (!selectedHemocentro) return;

        const formData = new FormData(e.target);
        const data = {
            nome_hemocentro: formData.get('nome'),
            cidade_hemocentro: formData.get('cidade'),
            bairro_hemocentro: formData.get('bairro'),
            rua_hemocentro: formData.get('rua')
        };

        try {
            setLoading(true);
            await axios.put(`http://localhost:5010/editarHemocentro/${selectedHemocentro.id_hemocentro}`, data);
            alert('Hemocentro editado com sucesso!');
        } catch (error) {
            alert('Erro ao editar hemocentro');
        } finally {
            setLoading(false);
        }
    };

    const handleEstoqueChange = async (tipo, quantidade, quantidadeMaxima, acao) => {
        if (!selectedHemocentro) return;

        const data = {
            nome_hemo: selectedHemocentro.nome_hemocentro,
            tipo_sanguineo: tipo,
            quantidade: parseFloat(quantidade),
            quantidade_maxima: parseFloat(quantidadeMaxima)
        };

        try {
            setLoading(true);
            const endpoint = acao === 'adicionar' ? 'adicionarEstoque' : 'retirarEstoque';
            await axios.put(`http://localhost:5010/${endpoint}`, data, {
                headers: { 'x-access-token': localStorage.getItem('token') }
            });
            await carregarEstoque(selectedHemocentro.nome_hemocentro);
            alert(`${acao === 'adicionar' ? 'Adicionado' : 'Retirado'} com sucesso!`);
        } catch (error) {
            const errorMessage = error.response?.data?.erro || error.message || `Erro ao ${acao}`;
            alert(errorMessage);
        } finally {
            setLoading(false);
        }

    };

    const carregarMeses = async () => {
        try {
            const resposta = await axios.get(`http://localhost:5010/listarMeses/${selectedHemocentro.nome_hemocentro}`, {
                headers: { 'x-access-token': localStorage.getItem('token') }
            });
            setMeses(resposta.data.registros || []);
        } catch (error) {
            console.error('Erro ao carregar os registros: ', error);
        }
    }

    const carregarDatas = async (mes) => {
        try {
            const resposta = await axios.get(`http://localhost:5010/listarDatas/${encodeURIComponent(selectedHemocentro.nome_hemocentro)}/${encodeURIComponent(mes)}`, {
                headers: { 'x-access-token': localStorage.getItem('token') }
            });
            setDatas(resposta.data.registros || []);
            setHorarios([]);
        } catch (error) {
            console.error('Erro ao carregar datas:', error);
        }
    }

    const carregarHorarios = async (data) => {
        try {
            const resposta = await axios.post(`http://localhost:5010/listarHorarios/${selectedHemocentro.nome_hemocentro}`, { data }, {
                headers: { 'x-access-token': localStorage.getItem('token') }
            });
            setHorarios(resposta.data.registros || []);
        } catch (error) {
            console.error('Erro ao carregar horários:', error);
        }
    }

    const carregarVoluntarios = async (nomeHemocentro) => {
        try {
            const resposta = await axios.post('http://localhost:5010/listarVoluntariosHemocentro', {
                nome_hemocentro: nomeHemocentro
            });
            setVoluntarios(resposta.data.resposta || []);
        } catch (error) {
            console.error('Erro ao carregar voluntários:', error);
            setVoluntarios([]);
        }
    }

    const handleDeletarVoluntario = async (id_voluntario) => {
       if (!selectedHemocentro) return;
        try {
            setLoading(true);
            const response = await axios.delete(`http://localhost:5010/deletarVoluntario/${id_voluntario}`, {
                headers: { 'x-access-token': localStorage.getItem('token') }
            });
            if (response.data.erro) {
                alert(response.data.erro);
            } else {
                alert(response.data.resposta);
                carregarVoluntarios(selectedHemocentro.nome_hemocentro);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.erro || error.message || 'Erro ao remover voluntário';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const startEdit = (voluntario) => {
        setEditingVoluntario(voluntario.id_voluntario);
        setOriginalVoluntario(voluntario);
        setEditForm({
            nome: voluntario.nome_voluntario || '',
            email: voluntario.email_voluntario || '',
            telefone: voluntario.telefone_voluntario || '',
            cpf: voluntario.cpf_voluntario || '',
            disponibilidade: voluntario.disponibilidade_voluntario || '',
            mensagem: voluntario.mensagem_voluntario || ''
        });
    };

    const cancelEdit = () => {
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

    const saveEdit = async () => {
        try {
            const data = {};
            if (editForm.nome !== originalVoluntario.nome_voluntario) data.nome = editForm.nome;
            if (editForm.email !== originalVoluntario.email_voluntario) data.email = editForm.email;
            if (editForm.telefone !== originalVoluntario.telefone_voluntario) data.telefone = editForm.telefone;
            if (editForm.cpf !== originalVoluntario.cpf_voluntario) data.cpf = editForm.cpf === '' ? null : editForm.cpf;
            if (editForm.disponibilidade !== originalVoluntario.disponibilidade_voluntario) data.disponibilidade = editForm.disponibilidade === '' ? null : editForm.disponibilidade;
            if (editForm.mensagem !== originalVoluntario.mensagem_voluntario) data.mensagem = editForm.mensagem;

            if (Object.keys(data).length === 0) {
                alert('Nenhuma alteração foi feita.');
                setEditingVoluntario(null);
                return;
            }

            const response = await axios.put(`http://localhost:5010/editarVoluntario/${editingVoluntario}`, data, {
                headers: { 'x-access-token': localStorage.getItem('token') }
            });
            alert('Voluntário editado com sucesso!');
            setEditingVoluntario(null);
            carregarVoluntarios(selectedHemocentro.nome_hemocentro);
        } catch (error) {
            console.error('Erro ao editar voluntário:', error);
            alert('Erro ao editar voluntário. Verifique o console.');
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };



    const handleAdicionarSemana = async (e) => {
        e.preventDefault();
        if (!selectedHemocentro) return;

        const formData = new FormData(e.target);
        const horarioInicio = formData.get('horarioInicio');
        const horarioFim = formData.get('horarioFim');

        // Função para gerar horários de meia em meia hora
        const gerarHorarios = (inicio, fim) => {
            const horarios = [];
            const [horaInicio, minInicio] = inicio.split(':').map(Number);
            const [horaFim, minFim] = fim.split(':').map(Number);

            let horaAtual = horaInicio;
            let minAtual = minInicio;

            while (horaAtual < horaFim || (horaAtual === horaFim && minAtual <= minFim)) {
                const horario = `${horaAtual.toString().padStart(2, '0')}:${minAtual.toString().padStart(2, '0')}`;
                horarios.push(horario);

                minAtual += 30;
                if (minAtual >= 60) {
                    minAtual = 0;
                    horaAtual += 1;
                }
            }

            return horarios;
        };

        const horarios = gerarHorarios(horarioInicio, horarioFim);

        const data = {
            nome_hemo: selectedHemocentro.nome_hemocentro,
            data_inicial: formData.get('dataInicial'),
            data_final: formData.get('dataFinal'),
            horarios: horarios
        };

        try {
            setLoading(true);
            await axios.post('http://localhost:5010/adicionarSemana', data, {
                headers: { 'x-access-token': localStorage.getItem('token') }
            });
            alert('Dias adicionados');
            carregarMeses();
        } catch (error) {
            const errorMessage = error.response?.data?.erro || error.message || 'Erro ao adicionar semana';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const handleAdicionarDia = async (e) => {
        e.preventDefault();
        if (!selectedHemocentro) return;

        const formData = new FormData(e.target);
        const data = {
            nome_hemo: selectedHemocentro.nome_hemocentro,
            data: formData.get('data'),
            horario_inicio: formData.get('horarioInicio'),
            horario_fim: formData.get('horarioFim')
        };

        try {
            setLoading(true);
            await axios.post('http://localhost:5010/adicionarDia', data, {
                headers: { 'x-access-token': localStorage.getItem('token') }
            });
            alert('Dia adicionado com sucesso!');
            carregarMeses();
        } catch (error) {
            alert('Erro ao adicionar dia');
        } finally {
            setLoading(false);
        }
    }

    const handleDeletarHorario = async (data, horario) => {
        if (!selectedHemocentro) return;

        try {
            setLoading(true);
            await axios.delete(`http://localhost:5010/deletarHorarioAgenda/${selectedHemocentro.nome_hemocentro}`, {
                data: { data, horario },
                headers: { 'x-access-token': localStorage.getItem('token') }
            });
            alert('Horário removido com sucesso!');
            carregarHorarios(data);
        } catch (error) {
            alert('Erro ao remover horário');
        } finally {
            setLoading(false);
        }
    }

    const handleDeletarDia = async (data) => {
        if (!selectedHemocentro) return;

        try {
            setLoading(true);
            await axios.delete(`http://localhost:5010/deletarDiaAgenda/${selectedHemocentro.nome_hemocentro}`, {
                data: { data },
                headers: { 'x-access-token': localStorage.getItem('token') }
            });
            alert('Dia removido com sucesso!');
            carregarMeses();
            if (mesSelecionado) {
                carregarDatas(mesSelecionado);
            }
        } catch (error) {
            alert('Erro ao remover dia');
       } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (activeTab === 'agenda' && selectedHemocentro) {
            carregarMeses();
        }
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === 'estoque' && selectedHemocentro) {
            carregarEstoque(selectedHemocentro.nome_hemocentro);
        }
    }, [activeTab, selectedHemocentro]);

    useEffect(() => {
        if (activeTab === 'voluntarios' && selectedHemocentro) {
            carregarVoluntarios(selectedHemocentro.nome_hemocentro);
        }
    }, [activeTab, selectedHemocentro]);

    return (
        <div className='container-editar-hemo'>
            <Header />
            <section className='container-main'>
                <h2>Editar Hemocentro</h2>

                {selectedHemocentro && (
                    <div className='conteudo'>
                        <div className='tabs'>
                            <button
                                className={activeTab === 'info' ? 'active' : ''}
                                onClick={() => setActiveTab('info')}
                            >
                                Informações
                            </button>
                            <button
                                className={activeTab === 'estoque' ? 'active' : ''}
                                onClick={() => setActiveTab('estoque')}
                            >
                                Estoque
                            </button>
                            <button
                                className={activeTab === 'agenda' ? 'active' : ''}
                                onClick={() => setActiveTab('agenda')}
                            >
                                Agenda
                            </button>
                            <button
                                className={activeTab === 'voluntarios' ? 'active' : ''}
                                onClick={() => setActiveTab('voluntarios')}
                            >
                                Voluntários
                            </button>

                        </div>

                        {activeTab === 'info' && (
                            <div className='tab-content'>
                                <h3>Informações do Hemocentro</h3>
                                <form onSubmit={handleEditarInfo}>
                                    <div className='grupo'>
                                        <label>Nome:</label>
                                        <input
                                            type="text"
                                            name="nome"
                                            defaultValue={selectedHemocentro.nome_hemocentro}
                                            required
                                        />
                                    </div>
                                    <div className='grupo'>
                                        <label>Cidade:</label>
                                        <input
                                            type="text"
                                            name="cidade"
                                            defaultValue={selectedHemocentro.cidade_hemocentro}
                                            required
                                        />
                                    </div>
                                    <div className='grupo'>
                                        <label>Bairro:</label>
                                        <input
                                            type="text"
                                            name="bairro"
                                            defaultValue={selectedHemocentro.bairro_hemocentro}
                                            required
                                        />
                                    </div>
                                    <div className='grupo'>
                                        <label>Rua:</label>
                                        <input
                                            type="text"
                                            name="rua"
                                            defaultValue={selectedHemocentro.rua_hemocentro}
                                            required
                                        />
                                    </div>
                                    <button type="submit" disabled={loading}>
                                        {loading ? 'Salvando...' : 'Salvar Alterações'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'estoque' && (
                            <div className='tab-content'>
                                <h3>Gerenciar Estoque</h3>
                                <div className='estoque-list'>
                                    {Array.isArray(estoque) && estoque.map(item => (
                                        <div key={item.tipo_sanguineo} className='estoque-item'>
                                            <h4>{item.tipo_sanguineo}</h4>
                                            <p>Bolsas: {item.quantidade_bolsas}</p>
                                            <p>Máximo: {item.quantidade_maxima}</p>
                                            <div className='acoes'>
                                                <input
                                                    type="number"
                                                    placeholder="Quantidade"
                                                    min="0"
                                                    id={`quant-${item.tipo_sanguineo}`}
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Máx"
                                                    min="0"
                                                    id={`max-${item.tipo_sanguineo}`}
                                                />
                                                <button onClick={async () => {
                                                    const quantInput = document.getElementById(`quant-${item.tipo_sanguineo}`);
                                                    const maxInput = document.getElementById(`max-${item.tipo_sanguineo}`);
                                                    const quant = quantInput.value || 0;
                                                    const max = maxInput.value || 0;
                                                    await handleEstoqueChange(item.tipo_sanguineo, quant, max, 'adicionar');
                                                    quantInput.value = '';
                                                    maxInput.value = '';
                                                }}>
                                                    Adicionar
                                                </button>
                                                <button onClick={async () => {
                                                    const quantInput = document.getElementById(`quant-${item.tipo_sanguineo}`);
                                                    const maxInput = document.getElementById(`max-${item.tipo_sanguineo}`);
                                                    const quant = quantInput.value || 0;
                                                    const max = maxInput.value || 0;
                                                    await handleEstoqueChange(item.tipo_sanguineo, quant, max, 'retirar');
                                                    quantInput.value = '';
                                                    maxInput.value = '';
                                                }}>
                                                    Retirar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'agenda' && (
                            <div className='tab-content'>
                                <h3>Agenda Do Hemocentro</h3>

                                <div className='add-form'>
                                    <h4>Adicionar dias</h4>
                                    <form onSubmit={handleAdicionarSemana}>
                                        <div className='form-group'>
                                            <label>Data Inicial (DD/MM/YYYY):</label>
                                            <input
                                                type="text"
                                                name="dataInicial"
                                                placeholder="01/01/2025"
                                                required
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label>Data Final (DD/MM/YYYY):</label>
                                            <input
                                                type="text"
                                                name="dataFinal"
                                                placeholder="07/01/2025"
                                                required
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label>Horário de Início (HH:MM):</label>
                                            <input
                                                type="text"
                                                name="horarioInicio"
                                                placeholder="08:00"
                                                required
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label>Horário de Fim (HH:MM):</label>
                                            <input
                                                type="text"
                                                name="horarioFim"
                                                placeholder="18:00"
                                                required
                                            />
                                        </div>
                                        <button type="submit" disabled={loading}>
                                            {loading ? 'Adicionando...' : 'Adicionar '}
                                        </button>
                                    </form>
                                </div>

                                <div className='add-form'>
                                    <h4>Adicionar Dia Específico</h4>
                                    <form onSubmit={handleAdicionarDia}>
                                        <div className='form-group'>
                                            <label>Data (DD/MM/YYYY):</label>
                                            <input
                                                type="text"
                                                name="data"
                                                placeholder="01/01/2025"
                                                required
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label>Horário de Início (HH:MM):</label>
                                            <input
                                                type="text"
                                                name="horarioInicio"
                                                placeholder="08:00"
                                                required
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label>Horário de Fim (HH:MM):</label>
                                            <input
                                                type="text"
                                                name="horarioFim"
                                                placeholder="18:00"
                                                required
                                            />
                                        </div>
                                        <button type="submit" disabled={loading}>
                                            {loading ? 'Adicionando...' : 'Adicionar Dia'}
                                        </button>
                                    </form>
                                </div>

                                <div className='agenda-hierarquia'>
                                    <div className='meses'>
                                        <h3>Visualizar/editar datas</h3>
                                        <h4>Meses Disponíveis</h4>
                                        <div className='meses-list'>
                                            {meses.map((mes) => (
                                                <button
                                                    key={mes.mes}
                                                    className={`mes-card ${mesSelecionado === mes.mes ? 'selected' : ''}`}
                                                    onClick={() => {
                                                        setMesSelecionado(mes.mes);
                                                        setDataSelecionada('');
                                                        setHorarios([]);
                                                        carregarDatas(mes.mes);
                                                    }}
                                                >
                                                    {mes.mes}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {mesSelecionado && (
                                        <div className='datas'>
                                            <h4>Datas Disponíveis</h4>
                                            <div className='datas-list'>
                                                {datas.map((dia) => (
                                                <button
                                                    key={dia.data}
                                                    className={`dia-card ${dataSelecionada === dia.data ? 'selected' : ''}`}
                                                    onClick={() => {
                                                        setDataSelecionada(dia.data);
                                                        setHorarios([]);
                                                        carregarHorarios(dia.data);
                                                    }}
                                                >
                                                    {dia.data}
                                                    <button className="remover-dia-btn" onClick={() => handleDeletarDia(dia.data)}>
                                                        Remover Dia
                                                    </button>
                                                </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {dataSelecionada && (
                                        <div className='horarios'>
                                            <h4>Horários Disponíveis</h4>
                                            <div className='horarios-list'>
                                                {horarios.map((hora) => (
                                                    <div key={hora.horario} className='horario-item'>
                                                        {hora.horario}
                                                        <button onClick={() => handleDeletarHorario(dataSelecionada, hora.horario)}>
                                                            Remover
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        )}

                        {activeTab === 'voluntarios' && (
                            <div className='tab-content'>
                                <h3>Voluntários do Hemocentro</h3>
                                <div className='voluntarios-list'>
                                    {Array.isArray(voluntarios) && voluntarios.length > 0 ? (
                                        voluntarios.map(voluntario => (
                                            <div key={voluntario.id_voluntario} className='voluntario-item'>
                                                {editingVoluntario === voluntario.id_voluntario ? (
                                                    <div className='edit-form'>
                                                        <input
                                                            type="text"
                                                            name="nome"
                                                            value={editForm.nome}
                                                            onChange={handleEditChange}
                                                            placeholder="Nome"
                                                        />
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={editForm.email}
                                                            onChange={handleEditChange}
                                                            placeholder="Email"
                                                        />
                                                        <input
                                                            type="text"
                                                            name="telefone"
                                                            value={editForm.telefone}
                                                            onChange={handleEditChange}
                                                            placeholder="Telefone"
                                                        />
                                                        <input
                                                            type="text"
                                                            name="cpf"
                                                            value={editForm.cpf}
                                                            onChange={handleEditChange}
                                                            placeholder="CPF"
                                                        />
                                                        <input
                                                            type="text"
                                                            name="disponibilidade"
                                                            value={editForm.disponibilidade}
                                                            onChange={handleEditChange}
                                                            placeholder="Disponibilidade"
                                                        />
                                                        <textarea
                                                            name="mensagem"
                                                            value={editForm.mensagem}
                                                            onChange={handleEditChange}
                                                            placeholder="Mensagem"
                                                        />
                                                        <div className='botoes-acao'>
                                                            <button onClick={saveEdit}>Salvar</button>
                                                            <button onClick={cancelEdit}>Cancelar</button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <h4>{voluntario.nome_voluntario}</h4>
                                                        <p><strong>Email:</strong> {voluntario.email_voluntario}</p>
                                                        <p><strong>Telefone:</strong> {voluntario.telefone_voluntario}</p>
                                                        <p><strong>CPF:</strong> {voluntario.cpf_voluntario}</p>
                                                        <p><strong>Tipo Sanguíneo:</strong> {voluntario.tipo_sanguineo_voluntario}</p>
                                                        <p><strong>Disponibilidade:</strong> {voluntario.disponibilidade_voluntario}</p>
                                                        <p><strong>Mensagem:</strong> {voluntario.mensagem_voluntario}</p>
                                                        <div className='botoes-acao'>
                                                            <button onClick={() => startEdit(voluntario)}>Editar</button>
                                                            <button
                                                                onClick={() => handleDeletarVoluntario(voluntario.id_voluntario)}
                                                                className='delete-btn'
                                                                disabled={loading}
                                                            >
                                                                {loading ? 'Removendo...' : 'Remover Voluntário'}
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p>Nenhum voluntário encontrado para este hemocentro.</p>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </section>
        </div>
    );
}
