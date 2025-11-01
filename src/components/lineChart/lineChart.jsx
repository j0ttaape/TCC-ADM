import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LinearScale, PointElement, LineElement, CategoryScale, Tooltip, Legend } from 'chart.js'
import api from '../../app.js';
import './index.scss'

ChartJS.register(LinearScale, PointElement, LineElement, CategoryScale, Tooltip, Legend);

const LineChart = () => {
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        const loadAgendamentos = async () => {
            try {
                const response = await api.get('/relatorioGeral/agendamentos');
                setAgendamentos(response.data);
            } catch (error) {
                console.error('Erro ao carregar agendamentos:', error);
            }
        }

        loadAgendamentos();
    }, []);

    // Filtrar entradas com datas inválidas e agrupar por data usando a data local (YYYY-MM-DD)
    // Evita usar toISOString() que converte para UTC e pode deslocar o dia local para o dia anterior.
    const contadorPorDataISO = agendamentos.reduce((acc, agendamento) => {
        if (!agendamento || !agendamento.data_agendamento) return acc;
        const d = new Date(agendamento.data_agendamento);
        if (!isFinite(d.getTime())) return acc; // data inválida -> ignorar

        // construir chave YYYY-MM-DD com base na data local
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const iso = `${year}-${month}-${day}`;

        acc[iso] = (acc[iso] || 0) + 1;
        return acc;
    }, {});

    // ordenar as chaves (YYYY-MM-DD) lexicograficamente funciona para ordenação cronológica
    const datasOrdenadasISO = Object.keys(contadorPorDataISO).sort();

    // labels em formato pt-BR e valores por data (diários)
    const labels = datasOrdenadasISO.map(d => {
        const [y, m, day] = d.split('-');
        return new Date(Number(y), Number(m) - 1, Number(day)).toLocaleDateString('pt-BR');
    });
    const valoresPorData = datasOrdenadasISO.map(d => contadorPorDataISO[d] || 0);

    // transformar em cumulativo para que a linha sempre aumente (comece em baixo e suba)
    const cumulativo = valoresPorData.reduce((acc, cur, idx) => {
        if (idx === 0) acc.push(cur);
        else acc.push(acc[idx - 1] + cur);
        return acc;
    }, []);

    // Usar a série diária como linha principal (restaurando a série correta) e manter acumulado para tooltip
    const datas = {
        labels,
        datasets: [
            {
                label: "Diário",
                data: valoresPorData,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.12)',
                tension: 0.2,
                fill: false,
                borderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointHitRadius: 10,
            }
        ]
    }

    const chartOptions = {
        interaction: {
            mode: 'index',
            intersect: false,
        },
        elements: {
            point: {
                radius: 4,
                hoverRadius: 6,
            }
        },
        scales: {
            x: {
                type: 'category',
                position: 'bottom',
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                min: 0,
                ticks: {
                    stepSize: 1,
                    callback: function(value) {
                        return Number.isInteger(value) ? value : null;
                    }
                }
            }
        },
        plugins: {
            legend: { display: true },
            tooltip: {
                enabled: true,
                callbacks: {
                    title: function(context) {
                        const idx = context[0]?.dataIndex;
                        return labels[idx] || '';
                    },
                    label: function(context) {
                        const idx = context.dataIndex;
                        const acumulado = cumulativo[idx] ?? 0;
                        const diario = valoresPorData[idx] ?? 0;
                        // retornar array para mostrar múltiplas linhas no tooltip
                        return [`Diário: ${diario}`, `Acumulado: ${acumulado}`];
                    }
                }
            }
        }
    }

    return (
        <div className="line-chart-container">
            <Line className="line-chart" data={datas} options={chartOptions} />
        </div>
    )
}

export default LineChart
