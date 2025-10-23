import connection from "../../connection.js";


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
const [rows] = await connection.query(comando2, [id, requisitos.diaInicio, requisitos.hComeco, requisitos.hComeco, requisitos.hFim]);

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
const [rows] = await connection.query(comando2, [id, requisitos.dia, requisitos.hComeco, requisitos.hComeco, requisitos.hFim]);

return rows.affectedRows;

}

export async function listarAgenda(nome){
const comando = `
select a.data_disponivel, a.horario_disponivel from agenda a
inner join hemocentros h on a.id_hemocentro = h.id_hemocentro
where h.nome_hemocentro = ? 
`

const [registros] = await connection.query(comando,[nome] );

return registros;

}