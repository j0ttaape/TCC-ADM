import connection from "../connection.js";


export async function listarUser() {
    const comando = `
    SELECT
        c.id_cadastro AS id,
        c.nome_completo,
        c.cpf,
        c.tipo_sanguineo,
        c.telefone,
        (SELECT MAX(a.data_agendamento) FROM agendamentos a WHERE a.usuario_id = c.id_cadastro AND a.data_agendamento < CURDATE()) AS ultima_doacao,
        (SELECT MIN(a.data_agendamento) FROM agendamentos a WHERE a.usuario_id = c.id_cadastro AND a.data_agendamento >= CURDATE()) AS proxima_doacao
    FROM cadastro_users c;
    `
    const [registros] = await connection.query(comando);
    return registros
}

export async function buscarUser(cpf) {
    const comando = `
    SELECT
        c.id_cadastro AS id,
        c.nome_completo,
        c.cpf,
        c.tipo_sanguineo,
        c.telefone,
        (SELECT MAX(a.data_agendamento) FROM agendamentos a WHERE a.usuario_id = c.id_cadastro AND a.data_agendamento < CURDATE()) AS ultima_doacao,
        (SELECT MIN(a.data_agendamento) FROM agendamentos a WHERE a.usuario_id = c.id_cadastro AND a.data_agendamento >= CURDATE()) AS proxima_doacao
    FROM cadastro_users c
    WHERE c.cpf = ?;
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