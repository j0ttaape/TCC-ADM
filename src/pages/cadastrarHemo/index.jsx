import Header from '../../components/header/index.jsx';
import './index.scss'

export default function CadastrarHemo() {
    return (
        <div className='container-cadastrar-hemo'>
            <Header />
            <section className='container-hemos'>
                <h2>esse é o cadastrar hemocentro</h2>

                <div className='grupos'>

                    <div className='grupo'>
                        <label >insira o nome</label>
                        <input type="text"
                            placeholder="nome do hemocentro"
                            className="input"
                            required
                        />
                    </div>

                    <div className='grupo'>
                        <label >insira a cidade</label>
                        <input type="text"
                            placeholder="cidade do hemocentro"
                            className="input"
                            required
                        />
                    </div>

                    <div className='grupo'>
                        <label >insira o bairro</label>
                        <input type="text"
                            placeholder="bairro do hemocentro"
                            className="input"
                            required
                        />
                    </div>

                    <div className='grupo'>
                        <label >insira a rua</label>
                        <input type="text"
                            placeholder="Rua do hemocentro"
                            className="input"
                            required
                        />
                    </div>
                </div>

                    <div><button>Cadastrar</button></div>
            </section>
        </div>
    )
}
