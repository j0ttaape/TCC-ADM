import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, LinearScale, BarElement, CategoryScale, Tooltip, Legend } from 'chart.js'
import api from '../../app.js';
import './index.scss'

ChartJS.register(LinearScale, BarElement, CategoryScale, Tooltip, Legend);

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
    const total = values.reduce((sum, value) => sum + value, 0);

    const datas = {
        labels,
        datasets: [
            {
                label: 'Litros',
                data: values,
                backgroundColor: dados.map((item, index) => {
                    const colors = [
                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                        'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
                        'linear-gradient(135deg, #ebc0fd 0%, #d9ded8 100%)'
                    ];
                    return colors[index % colors.length];
                }),
                hoverBackgroundColor: dados.map((item, index) => {
                    const colors = [
                        'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                        'linear-gradient(135deg, #e083eb 0%, #e54f5c 100%)',
                        'linear-gradient(135deg, #3e9ce9 0%, #00e2e9 100%)',
                        'linear-gradient(135deg, #39d96b 0%, #30e9c7 100%)',
                        'linear-gradient(135deg, #ea618a 0%, #eec030 100%)',
                        'linear-gradient(135deg, #98d4da 0%, #eeb6d3 100%)',
                        'linear-gradient(135deg, #c289b2 0%, #efe9c7 100%)',
                        'linear-gradient(135deg, #dbc0ed 0%, #c9cdc8 100%)'
                    ];
                    return colors[index % colors.length];
                }),
                borderColor: dados.map((item, index) => {
                    const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#a8edea', '#d299c2', '#ebc0fd'];
                    return colors[index % colors.length];
                }),
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
                maxBarThickness: 70,
                barThickness: 50,
            }
        ]
    }

    const chartOptions = {
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart',
            delay: function(context) {
                return context.dataIndex * 200;
            }
        },
        scales: {
            x: {
                type: 'category',
                position: 'bottom',
                grid: {
                    display: true,
                    color: 'rgba(0,0,0,0.04)',
                    borderDash: [6, 6]
                },
                ticks: {
                    color: '#6b7280',
                    font: { size: 11 },
                    maxRotation: 45,
                    minRotation: 40,
                    autoSkip: true,
                    maxTicksLimit: 12
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#6b7280',
                    font: { size: 11 },
                    callback: function(value) {
                        return Number.isInteger(value) ? value.toFixed(2) + ' L' : null;
                    }
                },
                grid: {
                    color: 'rgba(0,0,0,0.04)',
                    lineWidth: 1,
                    borderDash: [6, 6]
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                titleColor: '#0b2447',
                bodyColor: '#374151',
                borderColor: 'rgba(79, 70, 229, 0.16)',
                borderWidth: 1,
                cornerRadius: 8,
                padding: 8,
                callbacks: {
                    title: function(context) {
                        return context[0]?.label || '';
                    },
                    label: function(context) {
                        const value = context.parsed.y || 0;
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `Litros: ${value.toFixed(2)} L (${percentage}%)`;
                    }
                }
            }
        }
    }

    return (
        <div className="blood-type-chart-container">
            <div className="chart-header">
                <h3>Litros de Bolsa por Tipo Sanguíneo</h3>
                <p>Total: {total.toFixed(2)} L</p>
            </div>

            <Bar className="blood-type-chart" data={datas} options={chartOptions} />
        </div>
    )
}

export default BloodTypeChart
