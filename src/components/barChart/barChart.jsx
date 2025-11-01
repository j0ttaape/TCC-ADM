import React, { useEffect, useState } from 'react'
import { Bar, } from 'react-chartjs-2'
import { Chart as ChartJS, LinearScale, BarElement, CategoryScale } from 'chart.js'
import api from '../../app.js';
import './index.scss'

ChartJS.register(LinearScale, BarElement, CategoryScale);






const BarChart = () => {
    const [cadastros, setCadastros] = useState([]);
  
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

    // Agrupar cadastros por data local (usar campo criado_em da tabela)
    const contadorPorData = cadastros.reduce((acc, item) => {
        if (!item || !item.criado_em) return acc;
        const d = new Date(item.criado_em);
        if (!isFinite(d.getTime())) return acc;
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const key = `${year}-${month}-${day}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});

    const dates = Object.keys(contadorPorData).sort();
    const labels = dates.map(d => {
        const [y, m, day] = d.split('-');
        return new Date(Number(y), Number(m) - 1, Number(day)).toLocaleDateString('pt-BR');
    });
    const values = dates.map(d => contadorPorData[d] || 0);

    const datas = {
        labels,
        datasets: [
            {
                label: 'Cadastros por dia',
                data: values,
                backgroundColor: 'rgba(79, 70, 229, 0.85)',
                hoverBackgroundColor: 'rgba(79, 70, 229, 1)',
                borderColor: 'rgba(79, 70, 229, 1)',
                borderWidth: 1,
                borderRadius: 6,
                borderSkipped: false,
            }
        ]
    }


    const chartOptions = {
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart',
            delay: function(context) {
                return context.dataIndex * 200; // Delay para animação sequencial
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
                        return Number.isInteger(value) ? value : null;
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
                        const idx = context[0]?.dataIndex;
                        return labels[idx] || '';
                    },
                    label: function(context) {
                        const idx = context.dataIndex;
                        const qtd = values[idx] ?? 0;
                        return `Cadastros: ${qtd}`;
                    }
                }
            }
        }
    }

    return (
        <div className="bar-chart-container">
            <div className="chart-header">
                <div>
                    <h3>Evolução de Cadastros</h3>
                    <p className="subtitle">Cadastros por dia</p>
                </div>
            </div>

            <Bar className="bar-chart" data={datas} options={chartOptions} />
        </div>
    )
}

export default BarChart