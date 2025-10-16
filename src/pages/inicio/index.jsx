import Header from '../../components/header/index.jsx';
import './index.scss'

export default function Inicio() {

    return (
        <div>

            <Header />

            <section className='container-main'>

                <h2>Bem-vindo ao HemoControl</h2>

                <p>Sistema de controle de hemodiálise.</p>

            </section>
            
        </div>
    )
}
