import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/index.jsx';
import './index.scss';

export default function Buscarhemo(){
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // Removido isEditing e editingHemo pois não são mais usados


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResultados([]);

        try {
            let url = 'http://localhost:5010/listarHemocentros';
            if (query.trim()) {
                url = `http://localhost:5010/buscarNome/${encodeURIComponent(query.trim())}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao buscar hemocentros');
            }
            const data = await response.json();
            setResultados(data.registros || []);
        } catch (err) {
            setError('Erro ao buscar hemocentros. Tente novamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este hemocentro?')) return;

        try {
            const response = await fetch(`http://localhost:5010/deletarHemocentro/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Erro ao deletar hemocentro');
            }
            setResultados(resultados.filter(hemo => hemo.id_hemocentro !== id));
            alert('Hemocentro deletado com sucesso!');
        } catch (err) {
            alert('Erro ao deletar hemocentro. Tente novamente.');
            console.error(err);
        }
    };

    const handleEdit = (hemo) => {
        navigate('/EditarHemocentro', { state: { hemo } });
    };


    

    return(
        <div className='container-buscar-hemo'>
            <Header />
            <section className='container-buscar'>
                <h2>Buscar Hemocentros</h2>

                <form onSubmit={handleSubmit}>
                    <div className='barra-pesquisa'>
                        <input
                            type="text"
                            placeholder="Digite o nome, cidade ou bairro do hemocentro"
                            className="campo-pesquisa"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit" className='botao-pesquisar' disabled={loading}>
                            {loading ? 'Buscando...' : 'Pesquisar'}
                        </button>
                    </div>
                </form>

                <div className='resultados'>
                    <h3>Resultados da Pesquisa</h3>
                    {error && <p className='erro'>{error}</p>}
                    <div className='lista-hemocentros'>
                        {resultados.length === 0 && !loading && !error && (
                            <p>Nenhum hemocentro encontrado.</p>
                        )}
                        {resultados.map((hemo, index) => (
                            <div key={index} className='hemocentro-item'>
                                <h4>{hemo.nome_hemocentro || 'Nome não disponível'}</h4>
                                <p><strong>Cidade:</strong> {hemo.cidade_hemocentro || 'Não informado'}</p>
                                <p><strong>Bairro:</strong> {hemo.bairro_hemocentro || 'Não informado'}</p>
                                <p><strong>Rua:</strong> {hemo.rua_hemocentro || 'Não informado'}</p>

                                <button onClick={() => handleEdit(hemo)}>Editar</button>
                                <button onClick={() => handleDelete(hemo.id_hemocentro)}>Excluir</button>
                            </div>
                        ))}
                    </div>
                </div>


            </section>
        </div>
    )
}
