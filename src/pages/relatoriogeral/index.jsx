import BarChart from '../../components/barChart/barChart';
import BloodTypeChart from '../../components/bloodTypeChart/bloodTypeChart';
import Cads from '../../components/cards/cads.jsx';
import DoughnutChart from '../../components/doughnutChart/doughnutChart';
import Header from '../../components/header/index.jsx';
import LineChart from '../../components/lineChart/lineChart.jsx';
import './index.scss'

export default function RelatorioGeral(){
    return(
        <div>
            <Header />
            <section className='container-relatorio'>
                <Cads/>

                <div className='graficos'>
                    <LineChart/>
                    <BarChart/>
                </div>
                <div className='graficos-secundarios'>
                    <DoughnutChart/>
                    <BloodTypeChart/>
                </div>
            </section>
        </div>
    )
}
