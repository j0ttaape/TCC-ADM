import BarChart from '../../components/barChart/barChart';
import Cads from '../../components/cards/cads.jsx';
import Header from '../../components/header/index.jsx';
import LineChart from '../../components/lineChart/lineChart.jsx';
import './index.scss'

export default function RelatorioGeral(){
    return(
        <div>
            <Header />
            <section className='container-relatorio'>
                <Cads/>
                <LineChart/>
                <BarChart/>
            </section>
        </div>
    )
}
