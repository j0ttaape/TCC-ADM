import connection from "../../connection.js";
import { converterDataBrasileiraParaISO } from "../../../utils/datatime.js";


export async function adicionarSemanaDisponivel(requisitos){
const comando = `
select id_hemocentro from hemocentros
where nome_hemocentro = ?
`
const [result] = await connection.query(comando, [requisitos.nome]);
if (!result) {
    throw new Error('Hemocentro não encontrado');
}
const id = result[0]?.id_hemocentro;

    const diaInicioISO = converterDataBrasileiraParaISO(requisitos.diaInicio);

    const comando2 = `
insert into agenda (id_hemocentro, data_disponivel, horario_disponivel)
select
    ? as id_hemocentro,
    date_add(?, interval dias.dia day) as data_agenda,
    addtime(?, SEC_TO_TIME((horas.hora * 30) * 60)) as hora_agenda
from
    (
        select 0 as dia union all select 1 union all select 2 union all
        select 3 union all select 4
    ) as dias,
    (
        select 0 as hora union all select 1 union all select 2 union all
        select 3 union all select 4 union all select 5 union all select 6 union all
        select 7 union all select 8 union all select 9 union all select 10 union all
        select 11 union all select 12 union all select 13 union all select 14 union all
        select 15 union all select 16 union all select 17
    ) as horas,
    (
        select 1 as repeticao
    ) as rep
where addtime(?, SEC_TO_TIME((horas.hora * 30) * 60)) <= ?;

`
const [rows] = await connection.query(comando2, [id, diaInicioISO, requisitos.hComeco, requisitos.hComeco, requisitos.hFim]);

return rows.affectedRows;

}

export async function adicionarDiaDisponivel(requisitos){
const comando = `
select id_hemocentro from hemocentros
where nome_hemocentro = ?
`
const [result] = await connection.query(comando, [requisitos.nome]);
if (!result) {
    throw new Error('Hemocentro não encontrado');
}
const id = result[0]?.id_hemocentro;

    const diaISO = converterDataBrasileiraParaISO(requisitos.dia);

    const comando2 = `
insert into agenda (id_hemocentro, data_disponivel, horario_disponivel)
select
    ? as id_hemocentro,
    ? as data_agenda,
    addtime(?, SEC_TO_TIME((horas.hora * 30) * 60)) as hora_agenda
from
    (
        select 0 as hora union all select 1 union all select 2 union all
        select 3 union all select 4 union all select 5 union all select 6 union all
        select 7 union all select 8 union all select 9 union all select 10 union all
        select 11 union all select 12 union all select 13 union all select 14 union all
        select 15 union all select 16 union all select 17
    ) as horas
where addtime(?, SEC_TO_TIME((horas.hora * 30) * 60)) <= ?;

`
const [rows] = await connection.query(comando2, [id, diaISO, requisitos.hComeco, requisitos.hComeco, requisitos.hFim]);

return rows.affectedRows;

}

export async function listarMeses(nome){
const comando = `
select distinct date_format(a.data_disponivel, '%m/%Y') as mes
from agenda a
inner join hemocentros h on a.id_hemocentro = h.id_hemocentro
where h.nome_hemocentro = ?
order by a.data_disponivel desc;
`

const [registros] = await connection.query(comando,[nome] );

return registros;

}

export async function listarDatasPorMes(nome, mes){
const comando = `
select distinct date_format(a.data_disponivel, '%d/%m/%Y') as data
from agenda a
inner join hemocentros h on a.id_hemocentro = h.id_hemocentro
where h.nome_hemocentro = ? and date_format(a.data_disponivel, '%m/%Y') = ?
order by a.data_disponivel asc;
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
select data_disponivel, mes, id_hemocentro
from (
    select
        date_format(a.data_disponivel, '%d/%m/%Y') as data_disponivel,
        date_format(a.data_disponivel, '%m/%Y') as mes,
        a.data_disponivel as data_original,
        h.id_hemocentro
    from agenda a
    inner join hemocentros h on a.id_hemocentro = h.id_hemocentro
    where h.nome_hemocentro = ?
    group by a.data_disponivel, h.id_hemocentro
) as sub
order by sub.data_original desc;

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
