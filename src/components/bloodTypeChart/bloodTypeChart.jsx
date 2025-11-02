import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import api from '../../app.js';
import './index.scss'

ChartJS.register(ArcElement, Tooltip, Legend);

const BloodTypeChart = () => {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        const loadDados = async () => {
            try {
                const response = await api.get('/relatorioQuantidadeBolsas');
                setDados(response.data.registros);
            } catch (error) {
                console.error('Erro ao carregar dados de bolsas:', error);
            }
        }

        loadDados();
    }, []);

    const labels = dados.map(item => item.tipo_sanguineo);
    const values = dados.map(item => parseFloat(item.quantidade_Tipo));

    const datas = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: dados.map((item, index) => `hsl(${index * 360 / dados.length}, 70%, 50%)`),
                hoverBackgroundColor: dados.map((item, index) => `hsl(${index * 360 / dados.length}, 70%, 40%)`),
                borderColor: dados.map((item, index) => `hsl(${index * 360 / dados.length}, 70%, 50%)`),
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
                borderColor: 'rgba(34, 197, 94, 0.3)',
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
                        return `${label}: ${value.toFixed(2)} L`;
                    }
                }
            }
        }
    }

    return (
        <div className="blood-type-chart-container">
            <div className="chart-header">
                <div>
                    <h3>Litros de Bolsa por Tipo Sanguíneo</h3>
                    <p className="subtitle">Quantidade total em litros</p>
                </div>
            </div>

            <Doughnut className="blood-type-chart" data={datas} options={chartOptions} />
        </div>
    )
}

export default BloodTypeChart
