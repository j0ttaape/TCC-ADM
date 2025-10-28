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
                    </div>
                )}
            </section>
        </div>
    );
}
