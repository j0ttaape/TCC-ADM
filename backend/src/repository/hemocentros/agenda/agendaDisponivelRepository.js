import connection from "../../connection.js";
import { converterDataBrasileiraParaISO } from "../../../utils/datatime.js";


export async function adicionarSemanaDisponivel(requisitos){
const comando = `
select id_hemocentro from hemocentros
where nome_hemocentro = ?
`
const [result] = await connection.query(comando, [requisitos.nome_hemo]);
if (!result || result.length === 0) {
    throw new Error('Hemocentro não encontrado');
}
const id = result[0]?.id_hemocentro;

    const diaInicioISO = converterDataBrasileiraParaISO(requisitos.data_inicial);
    const diaFimISO = converterDataBrasileiraParaISO(requisitos.data_final);

    const comando2 = `
insert into agenda (id_hemocentro, data_disponivel, horario_disponivel)
select
    ? as id_hemocentro,
    date_add(?, interval dias.dia day) as data_agenda,
    ? as hora_agenda
from
    (
        select 0 as dia
        union all select 1
        union all select 2
        union all select 3
        union all select 4
        union all select 5
        union all select 6
        union all select 7
        union all select 8
        union all select 9
        union all select 10
        union all select 11
        union all select 12
        union all select 13
        union all select 14
        union all select 15
        union all select 16
        union all select 17
        union all select 18
        union all select 19
        union all select 20
        union all select 21
        union all select 22
        union all select 23
        union all select 24
        union all select 25
        union all select 26
        union all select 27
        union all select 28
        union all select 29
        union all select 30
    ) as dias,
    (
        select ? as horario
    ) as horas
where date_add(?, interval dias.dia day) <= ?;

`
let affectedRows = 0;
for (const horario of requisitos.horarios) {
    const [rows] = await connection.query(comando2, [id, diaInicioISO, horario, horario, diaInicioISO, diaFimISO]);
    affectedRows += rows.affectedRows;
}

return affectedRows;

}

export async function adicionarDiaDisponivel(requisitos){
const comando = `
select id_hemocentro from hemocentros
where nome_hemocentro = ?
`
const [result] = await connection.query(comando, [requisitos.nome_hemo]);
if (!result || result.length === 0) {
    throw new Error('Hemocentro não encontrado');
}
const id = result[0]?.id_hemocentro;

    const diaISO = converterDataBrasileiraParaISO(requisitos.data);

    // Função para gerar horários de meia em meia hora
    const gerarHorarios = (inicio, fim) => {
        const horarios = [];
        const [horaInicio, minInicio] = inicio.split(':').map(Number);
        const [horaFim, minFim] = fim.split(':').map(Number);

        let horaAtual = horaInicio;
        let minAtual = minInicio;

        while (horaAtual < horaFim || (horaAtual === horaFim && minAtual <= minFim)) {
            const horario = `${horaAtual.toString().padStart(2, '0')}:${minAtual.toString().padStart(2, '0')}`;
            horarios.push(horario);

            minAtual += 30;
            if (minAtual >= 60) {
                minAtual = 0;
                horaAtual += 1;
            }
        }

        return horarios;
    };

    const horarios = gerarHorarios(requisitos.horario_inicio, requisitos.horario_fim);

    const comando2 = `
insert into agenda (id_hemocentro, data_disponivel, horario_disponivel)
values (?, ?, ?)
`

let affectedRows = 0;
for (const horario of horarios) {
    const [rows] = await connection.query(comando2, [id, diaISO, horario]);
    affectedRows += rows.affectedRows;
}

return affectedRows;

}

export async function listarMeses(nome){
const comando2 = `
select id_hemocentro from hemocentros 
where nome_hemocentro = ?
`
const [id] = await connection.query(comando2,[nome]);


const comando = `
select distinct date_format(a.data_disponivel, '%m/%Y') as mes, min(a.data_disponivel) as data_min
from agenda a
inner join hemocentros h on a.id_hemocentro = h.id_hemocentro
where h.id_hemocentro = ?
group by date_format(a.data_disponivel, '%m/%Y')
order by data_min asc;
`

const [registros] = await connection.query(comando,[id[0].id_hemocentro] );

return registros;

}

export async function listarDatasPorMes(nome, mes){
const comando = `
select distinct date_format(a.data_disponivel, '%d/%m/%Y') as data
from agenda a
inner join hemocentros h on a.id_hemocentro = h.id_hemocentro
where h.nome_hemocentro = ? and date_format(a.data_disponivel, '%m/%Y') = ?
group by date_format(a.data_disponivel, '%d/%m/%Y')
order by data asc;
`

const [registros] = await connection.query(comando,[nome, mes] );

return registros;

}

export async function listarHorariosPorData(nome, data){
const comando = `
select time_format(a.horario_disponivel, '%H:%i') as horario
from agenda a
inner join hemocentros h on a.id_hemocentro = h.id_hemocentro
where h.nome_hemocentro = ? and date_format(a.data_disponivel, '%d/%m/%Y') = ?
order by a.horario_disponivel asc;
`

const [registros] = await connection.query(comando,[nome, data] );

return registros;

}

export async function listarAgenda(nome){
const comando = `
select distinct date_format(a.data_disponivel, '%d/%m/%Y') as data, time_format(a.horario_disponivel, '%H:%i') as horario
from agenda a
inner join hemocentros h on a.id_hemocentro = h.id_hemocentro
where h.nome_hemocentro = ?
order by a.data_disponivel asc, a.horario_disponivel asc;
`

const [registros] = await connection.query(comando,[nome] );

return registros;

}

export async function deletarDiaAgenda(dia,nome){

    const diaISO = converterDataBrasileiraParaISO(dia);

    // Verificar se o dia existe na agenda
    const comandoVerificar = `
SELECT COUNT(*) as count
FROM agenda a
INNER JOIN hemocentros h ON h.id_hemocentro = a.id_hemocentro
WHERE a.data_disponivel = ?
AND h.nome_hemocentro = ?
`

    const [verificar] = await connection.query(comandoVerificar, [diaISO, nome]);
    if (verificar[0].count === 0) {
        throw new Error('Dia não encontrado na agenda');
    }

    const comando = `
DELETE agenda FROM agenda
INNER JOIN hemocentros h ON h.id_hemocentro = agenda.id_hemocentro
WHERE data_disponivel = ?
AND h.nome_hemocentro = ?
`

const [info] = await connection.query(comando,[diaISO,nome]);

return info.affectedRows

}

export async function deletarHorarioAgenda(dia, horario, nome){

    const diaISO = converterDataBrasileiraParaISO(dia);

    // Verificar se o horário específico existe na agenda
    const comandoVerificar = `
SELECT COUNT(*) as count
FROM agenda a
INNER JOIN hemocentros h ON h.id_hemocentro = a.id_hemocentro
WHERE a.data_disponivel = ?
AND a.horario_disponivel = ?
AND h.nome_hemocentro = ?
`

    const [verificar] = await connection.query(comandoVerificar, [diaISO, horario, nome]);
    if (verificar[0].count === 0) {
        throw new Error('Horário não encontrado na agenda');
    }

    const comando = `
DELETE agenda FROM agenda
INNER JOIN hemocentros h ON h.id_hemocentro = agenda.id_hemocentro
WHERE data_disponivel = ?
AND horario_disponivel = ?
AND h.nome_hemocentro = ?
`

const [info] = await connection.query(comando,[diaISO, horario, nome]);

return info.affectedRows

}
