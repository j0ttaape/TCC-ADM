import Header from '../../components/header/index.jsx';
import './index.scss'

export default function Hemocentros(){
    return(
        <div>
            <Header />
            <section className='container-tags'>
                <h2>Hemocentros</h2>
                <p>Gerencie os hemocentros aqui.</p>

                <input id='pesquisar-hemo'  type="text" placeholder='Pesquise o Hemocentro' />
            </section>
        </div>
    )
}
