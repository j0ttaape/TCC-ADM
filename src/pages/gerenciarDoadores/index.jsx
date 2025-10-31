import Header from '../../components/header/index.jsx';
import './index.scss';

export default function GerenciarDoadores(){
    return(
        <div>

        
            <Header />
        <div className='container-genreciarUsers'>
            <section className='container-buscar' >
            <h1>Gerenciar Doadores</h1>

                <div className='buscar'>
                    <input type="text" placeholder='Buscar doador...' />
                    <button>Buscar</button>
                </div>
            </section>

                <div className='summary'>
                    <h2>Doadores Cadastrados</h2>
                    <p>total: 150</p>
                </div>
            <section className='container-grupos-users'>
                <div className='grupo'>
                    <p>Nome: João Silva</p>
                    <p>Tipo Sanguíneo: O+</p>
                    <p>Última Doação: 15/03/2024</p>
                    <p>Contato: (11) 91234-5678</p>

                    <button>Editar </button>
                    <button>Excluir</button>
                </div>

                <div className='grupo'>
                    <p>Nome: João Silva</p>
                    <p>Tipo Sanguíneo: O+</p>
                    <p>Última Doação: 15/03/2024</p>
                    <p>Contato: (11) 91234-5678</p>

                    <button>Editar </button>
                    <button>Excluir</button>

                </div>

                <div className='grupo'>
                    <p>Nome: João Silva</p>
                    <p>Tipo Sanguíneo: O+</p>
                    <p>Última Doação: 15/03/2024</p>
                    <p>Contato: (11) 91234-5678</p>

                    <button>Editar </button>
                    <button>Excluir</button>
                </div>

                <div className='grupo'>
                    <p>Nome: João Silva</p>
                    <p>Tipo Sanguíneo: O+</p>
                    <p>Última Doação: 15/03/2024</p>
                    <p>Contato: (11) 91234-5678</p>

                    <button>Editar </button>
                    <button>Excluir</button>
                </div>

                <div className='grupo'>
                    <p>Nome: João Silva</p>
                    <p>Tipo Sanguíneo: O+</p>
                    <p>Última Doação: 15/03/2024</p>
                    <p>Contato: (11) 91234-5678</p>

                    <button>Editar </button>
                    <button>Excluir</button>
                </div>

                <div className='grupo'>
                    <p>Nome: João Silva</p>
                    <p>Tipo Sanguíneo: O+</p>
                    <p>Última Doação: 15/03/2024</p>
                    <p>Contato: (11) 91234-5678</p>

                    <button>Editar </button>
                    <button>Excluir</button>
                </div>
            </section>
        </div>
        </div>
    )
}
