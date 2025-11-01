import e from "cors";
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
    delete from cadastro_users where id_cadastro = ?;
    `
    const [registros] = await connection.query(comando, [id]);
    return registros
    
}

export async function atualizarUser(id, nome, telefone, tipoSanguineo) {

    const comando = `
    update cadastro_users
    set nome_completo = ?,
    telefone = ?,
    tipo_sanguineo = ?
    where id_cadastro = ?;
    `
    const [registros] = await connection.query(comando, [nome, telefone, tipoSanguineo, id]);
    return registros;
}

export async function cadastrarUser(nome, cpf, telefone, tipoSanguineo) {

    const comando = `
    insert into cadastro_users (nome_completo, cpf, telefone, tipo_sanguineo)
    values (?, ?, ?, ?);
    `
    const [registros] = await connection.query(comando, [nome, cpf, telefone, tipoSanguineo]);
    return registros;
}


export async function atualizarUserAgenda(atualizacao,cpf) {
    const comando =`
    update agendamentos
    set hemocentro_id = ?, data_agendamento = ?, horario_agendamento = ?, tipo_sanguineo = ?
    where usuario_id = ?;
    `
    const [registros] = await connection.query(comando, [atualizacao.hemocentro_id, atualizacao.data_agendamento, atualizacao.horario_agendamento, atualizacao.tipo_sanguineo,cpf]);
    return registros;
}

