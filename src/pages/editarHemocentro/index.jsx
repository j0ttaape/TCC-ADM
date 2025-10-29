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



    useEffect(() => {
        if (hemoFromState) {
            carregarEstoque(hemoFromState.nome_hemocentro);
        }
    }, []);

    const carregarEstoque = async (nome) => {
        try {
            const response = await axios.get(`http://localhost:5010/listarEstoque/${nome}`);
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
            quantidade: parseInt(quantidade),
            quantidade_maxima: parseInt(quantidadeMaxima)
        };

        try {
            setLoading(true);
            const endpoint = acao === 'adicionar' ? 'adicionarEstoque' : 'retirarEstoque';
            await axios.put(`http://localhost:5010/${endpoint}`, data, {
                headers: { 'x-access-token': localStorage.getItem('token') }
            });
            alert(`${acao === 'adicionar' ? 'Adicionado' : 'Retirado'} com sucesso!`);
            carregarEstoque(selectedHemocentro.nome_hemocentro);
        } catch (error) {
            alert(`Erro ao ${acao}`);
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
            alert('Semana adicionada com sucesso!');
            carregarMeses();
        } catch (error) {
            alert('Erro ao adicionar semana');
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
                                    {estoque.map(item => (
                                        <div key={item.tipo_sanguineo} className='estoque-item'>
                                            <h4>{item.tipo_sanguineo}</h4>
                                            <p>Bolsas: {item.quantidade_bolsas}</p>
                                            <p>Máximo: {item.quantidade_maxima}</p>
                                            <div className='acoes'>
                                                <input
                                                    type="number"
                                                    placeholder="Quantidade"
                                                    min="1"
                                                    id={`quant-${item.tipo_sanguineo}`}
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Máx"
                                                    min="1"
                                                    id={`max-${item.tipo_sanguineo}`}
                                                />
                                                <button onClick={() => {
                                                    const quant = document.getElementById(`quant-${item.tipo_sanguineo}`).value;
                                                    const max = document.getElementById(`max-${item.tipo_sanguineo}`).value;
                                                    handleEstoqueChange(item.tipo_sanguineo, quant, max, 'adicionar');
                                                }}>
                                                    Adicionar
                                                </button>
                                                <button onClick={() => {
                                                    const quant = document.getElementById(`quant-${item.tipo_sanguineo}`).value;
                                                    const max = document.getElementById(`max-${item.tipo_sanguineo}`).value;
                                                    handleEstoqueChange(item.tipo_sanguineo, quant, max, 'retirar');
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

                    </div>
                )}
            </section>
        </div>
    );
}
