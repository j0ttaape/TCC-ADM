import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/index.jsx';
import './index.scss'
import axios from 'axios';

export default function CadastrarHemo() {
    const navigate = useNavigate();

    const handleCadastrarClick = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            nome_hemocentro: formData.get('nome'),
            cidade_hemocentro: formData.get('cidade'),
            bairro_hemocentro: formData.get('bairro'),
            rua_hemocentro: formData.get('rua')
        };

        try {
            const response = await axios.post('http://localhost:5010/cadastrarHemocentro', data);
            alert('Hemocentro cadastrado com sucesso!');
        }


        catch (err) {
            const errorMessage = err.response?.data?.erro || err.message;
            alert('Erro ao cadastrar hemocentro' + errorMessage);
        }
    };

    return (
        <div className='container-cadastrar-hemo'>
            <Header />
            <section className='container-hemos'>
                <h2>esse é o cadastrar hemocentro</h2>

                <div className='grupos'>

                    <form onSubmit={handleCadastrarClick}>
                    <div className='grupo'>
                        <label >insira o nome</label>
                        <input type="text"
                            name='nome'
                            placeholder="nome do hemocentro"
                            className="input"
                            required
                        />
                    </div>

                    <div className='grupo'>
                        <label >insira a cidade</label>
                        <input type="text"
                            name='cidade'
                            placeholder="cidade do hemocentro"
                            className="input"
                            required
                        />
                    </div>

                    <div className='grupo'>
                        <label >insira o bairro</label>
                        <input type="text"
                            name='bairro'
                            placeholder="bairro do hemocentro"
                            className="input"
                            required
                        />
                    </div>

                    <div className='grupo'>
                        <label >insira a rua</label>
                        <input type="text"
                            name='rua'
                            placeholder="Rua do hemocentro"
                            className="input"
                            required
                        />
                    </div>

                    <div><button type="submit">Cadastrar</button></div>
                    </form>
                </div>
            </section>
        </div>
    )
}
