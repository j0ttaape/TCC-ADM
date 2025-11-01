import React, { useEffect, useState } from 'react'
import { Bar, } from 'react-chartjs-2'
import { Chart as ChartJS, LinearScale, BarElement, CategoryScale } from 'chart.js'
import api from '../../app.js';
import './index.scss'

ChartJS.register(LinearScale, BarElement, CategoryScale);






const BarChart = () => {
    const [cadastros, setCadastros] = useState([]);
    const [hemocentros, setHemocentros] = useState([]);
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {

        const loadCadastros = async () => {
            try {
                const response = await api.get('/relatorioGeral/cadastros');
                setCadastros(response.data);
            } catch (error) {
                console.error('Erro ao carregar cadastros:', error);
            }
        }
 
        loadCadastros();
    }, []);

    const datas = {
        labels: cadastros.map((item, index) => `${index + 1}`),
        datasets: [
            {
                label: "Cadastros",
                data: cadastros.map((item) => item.id_cadastro,),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    }


    const chartOptions = {
        scales: {
            x: {
                type: 'category',
                position: 'bottom',
            },
            y: {
                beginAtZero: true,
            }
        }
    }

    return (
        <div className="bar-chart-container">
            <h2>cadastros</h2>
            <Bar className="bar-chart" data={datas} options={chartOptions} />
        </div>
    )
}

export default BarChart