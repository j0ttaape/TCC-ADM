import Header from '../../components/header/index.jsx';
import './index.scss';

export default function Buscarhemo(){
    return(
        <div className='container-buscar-hemo'>
            <Header />
            <section className='container-buscar'>
                <h2>Buscar Hemocentros</h2>

                <div className='barra-pesquisa'>
                    <input type="text"
                        placeholder="Digite o nome, cidade ou bairro do hemocentro"
                        className="campo-pesquisa"
                    />
                    <button className='botao-pesquisar'>Pesquisar</button>
                </div>

                <div className='resultados'>
                    <h3>Resultados da Pesquisa</h3>
                    <div className='lista-hemocentros'>
                        {/* Exemplo de hemocentro - será substituído por dados dinâmicos */}
                        <div className='hemocentro-item'>
                            <h4>Hemocentro Central</h4>
                            <p><strong>Cidade:</strong> São Paulo</p>
                            <p><strong>Bairro:</strong> Centro</p>
                            <p><strong>Rua:</strong> Rua das Flores, 123</p>
                        </div>

                        <div className='hemocentro-item'>
                            <h4>Hemocentro Norte</h4>
                            <p><strong>Cidade:</strong> São Paulo</p>
                            <p><strong>Bairro:</strong> Santana</p>
                            <p><strong>Rua:</strong> Avenida Brasil, 456</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
