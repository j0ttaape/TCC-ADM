import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LinearScale, PointElement, LineElement, CategoryScale, Tooltip, Legend } from 'chart.js'
import api from '../../app.js';
import './index.scss'

ChartJS.register(LinearScale, PointElement, LineElement, CategoryScale, Tooltip, Legend);

const LineChart = () => {
    const [agendamentos, setAgendamentos] = useState([])

    useEffect(() => {
        const loadAgendamentos = async () => {
            try {
                const response = await api.get('/relatorioGeral/agendamentos')
                setAgendamentos(response.data || [])
            } catch (error) {
                console.error('Erro ao carregar agendamentos:', error)
            }
        }

        loadAgendamentos()
    }, [])

    // Agrupar por data local (YYYY-MM-DD) para evitar deslocamento por timezone
    const contadorPorDataISO = agendamentos.reduce((acc, agendamento) => {
        if (!agendamento || !agendamento.data_agendamento) return acc
        const d = new Date(agendamento.data_agendamento)
        if (!isFinite(d.getTime())) return acc

        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        const iso = `${year}-${month}-${day}`

        acc[iso] = (acc[iso] || 0) + 1
        return acc
    }, {})

    const datasOrdenadasISO = Object.keys(contadorPorDataISO).sort()

    const labels = datasOrdenadasISO.map(d => {
        const [y, m, day] = d.split('-')
        return new Date(Number(y), Number(m) - 1, Number(day)).toLocaleDateString('pt-BR')
    })

    const valoresPorData = datasOrdenadasISO.map(d => contadorPorDataISO[d] || 0)

    // cumulativo (mantemos para tooltip)
    const cumulativo = valoresPorData.reduce((acc, cur, idx) => {
        if (idx === 0) acc.push(cur)
        else acc.push(acc[idx - 1] + cur)
        return acc
    }, [])

    // calcular stepSize dinâmico para o eixo Y
    const computeStepSize = (maxVal) => {
        if (!isFinite(maxVal) || maxVal <= 5) return 1
        const raw = Math.ceil(maxVal / 4)
        const mag = Math.pow(10, Math.floor(Math.log10(raw)))
        return Math.ceil(raw / mag) * mag
    }

    const maxDaily = valoresPorData.length ? Math.max(...valoresPorData) : 0
    const stepSize = computeStepSize(maxDaily)

        const datas = {
            labels,
            datasets: [
                {
                    label: 'Agendamentos',
                    data: valoresPorData,
                    borderColor: 'rgba(124, 79, 255, 0.95)',
                    backgroundColor: 'rgba(124, 79, 255, 0.06)',
                    tension: 0.36,
                    fill: false,
                    borderWidth: 2.5, // linha mais fina
                    pointRadius: 5, // pontos menores
                    pointHoverRadius: 6,
                    pointBackgroundColor: 'rgba(124, 79, 255, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 1,
                    pointHitRadius: 10,
                }
            ]
        }

    const chartOptions = {
        animation: {
            duration: 1200,
            easing: 'easeInOutQuad'
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
            elements: {
                line: {
                    tension: 0.36,
                    borderJoinStyle: 'round'
                },
                point: {
                    radius: 3
                }
            },
        scales: {
                    x: {
                    type: 'category',
                    position: 'bottom',
                    grid: {
                        display: true,
                        drawOnChartArea: true,
                        color: 'rgba(15, 23, 42, 0.04)',
                        borderDash: [6, 6]
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 40,
                        autoSkip: true,
                        maxTicksLimit: 10,
                        color: '#6b7280',
                        font: { size: 11 }
                    }
                },
                    y: {
                    beginAtZero: true,
                    min: 0,
                    grid: {
                        display: true,
                        color: 'rgba(15, 23, 42, 0.04)',
                        borderDash: [6, 6]
                    },
                    ticks: {
                        stepSize,
                        color: '#6b7280',
                        font: { size: 11 },
                        callback: function (value) {
                            return Number.isInteger(value) ? value : null
                        }
                    }
                }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(255,255,255,0.98)',
                titleColor: '#111827',
                bodyColor: '#374151',
                borderColor: 'rgba(124, 79, 255, 0.18)',
                borderWidth: 1,
                padding: 8,
                cornerRadius: 8,
                callbacks: {
                    title: function (context) {
                        const idx = context[0]?.dataIndex
                        return labels[idx] || ''
                    },
                    label: function (context) {
                        const idx = context.dataIndex
                        const diario = valoresPorData[idx] ?? 0
                        const acumulado = cumulativo[idx] ?? 0
                        return [`Agendamentos: ${diario}`, `Acumulado: ${acumulado}`]
                    }
                }
            }
        }
    }



    return (
        <div className="line-chart-container">
            <div className="chart-header">
                <div>
                    <h3>Evolução de Agendamentos</h3>
                    <p className="subtitle">Agendamentos por dia</p>
                </div>
            </div>

            <Line className="line-chart" data={datas} options={chartOptions} />
        </div>
    )
}

export default LineChart
