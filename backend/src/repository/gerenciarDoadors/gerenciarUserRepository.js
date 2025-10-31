import connection from "../connection.js";


export async function listarUser() {
    const comando = `
    select a.id, c.nome_completo, h.nome_hemocentro, a.tipo_sanguineo, a.data_agendamento,a.telefone,a.cpf
from agendamentos a
inner join cadastro_users c on a.usuario_id = c.id_cadastro
inner join hemocentros h on a.hemocentro_id = h.id_hemocentro
where a.data_agendamento is not null;
    `
    const [registros] = await connection.query(comando);
    return registros
}

export async function buscarUser(cpf) {
    const comando = `
    select a.id, c.nome_completo, h.nome_hemocentro, a.tipo_sanguineo, a.data_agendamento,a.telefone, a.cpf
from agendamentos a
inner join cadastro_users c on a.usuario_id = c.id_cadastro
inner join hemocentros h on a.hemocentro_id = h.id_hemocentro
where a.cpf= ?;
    `
    const [registros] = await connection.query(comando, [cpf]);
    return registros
}

export async function deletarAgendaUser(id) {

    const comando = `
    delete from agendamentos where id = ?;
    `
    const [registros] = await connection.query(comando, [id]);
    return registros
    
}