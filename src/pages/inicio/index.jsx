import { useState, useEffect } from 'react';
import Header from '../../components/header/index.jsx';
import './index.scss';
import axios from 'axios';

export default function Inicio() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        carregarPedidos();
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

    return (
        <div>
            <Header />

            <section className='container-main'>
                <h2>Pedidos de Permissão</h2>

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
        </div>
    )
}
