import { useEffect, useState } from "react";
import api from "../../app";
import './index.scss'
import { Users, MapPin, Calendar, ChartBarIcon, ChartBarBig, ChartBarDecreasing} from 'lucide-react';


export default function Cads() {
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

        const loadAgendamentos = async () => {
            try {
                const response = await api.get('/relatorioGeral/agendamentos')
                setAgendamentos(response.data);
            } catch (error) {
                console.error('Erro ao carregar agendamentos:', error);
            }
        }

        const loadHemocentros = async () => {
            try {
                const response = await api.get('/relatorioGeral/hemocentros');
                setHemocentros(response.data);
            } catch (error) {
                console.error('Erro ao carregar hemocentros:', error);
            }
        }

        loadCadastros();
        loadAgendamentos();
        loadHemocentros();
    }, []);
    return (
        <div className='container-cads'>
            <div className='cards'>
                <div className='card'>
                    <div className="info">      
                        <h1>Total de cadastros</h1>
                        <h2>{cadastros.length}</h2>
                    </div>
                    <Users size={32} />
                </div>
                <div className='card'>
                    <div className="info">
                        <h1>Total de hemocentros</h1>
                        <h2>{hemocentros.length}</h2>
                    </div>
                    <MapPin size={32} />
                </div>
                <div className='card'>
                    <div className="info">

                    <h1>Total de agendamentos</h1>
                    <h2>{agendamentos.length}</h2>
                    </div>
                    <ChartBarDecreasing  size={32} />
                </div>
            </div>
        </div>
    )

}