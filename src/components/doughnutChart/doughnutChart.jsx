import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import api from '../../app.js';
import './index.scss'

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        const loadDados = async () => {
            try {
                // Buscar dados de hemocentros com contagem de agendamentos
                const response = await api.get('/relatorioGeral/hemocentros');

                const hemocentros = response.data.map((item, index) => ({
                    label: item.hemocentro,
                    value: item.totalAgendamentos,
                    color: `hsl(${index * 360 / response.data.length}, 70%, 50%)`
                }));

                setDados(hemocentros);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        }

        loadDados();
    }, []);

    const datas = {
        labels: dados.map(item => item.label),
        datasets: [
            {
                data: dados.map(item => item.value),
                backgroundColor: dados.map(item => item.color),
                hoverBackgroundColor: dados.map(item => item.color.replace(')', ', 0.8)')),
                borderColor: dados.map(item => item.color),
                borderWidth: 2,
                hoverBorderWidth: 3,
                cutout: '70%',
            }
        ]
    }

    const chartOptions = {
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart',
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    color: '#374151',
                    font: {
                        size: 14,
                        weight: '600'
                    },
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1f2937',
                bodyColor: '#374151',
                borderColor: 'rgba(59, 130, 246, 0.3)',
                borderWidth: 1,
                cornerRadius: 8,
                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 13
                },
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        return `${label}: ${value}`;
                    }
                }
            }
        }
    }

    const total = dados.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="doughnut-chart-container">
            <h1>Distribuição Geral</h1>
            <p>Total de registros: {total}</p>
            <div className="chart-wrapper">
                <Doughnut className="doughnut-chart" data={datas} options={chartOptions} />
            </div>
        </div>
    )
}

export default DoughnutChart
