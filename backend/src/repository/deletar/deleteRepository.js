import connection from "../connection.js";  

export  async function deletarHemocentro(id_hemocentro) {
    const comando = `
    delete from hemocentros
    where id_hemocentro = ?
    `

    await connection.query(comando, [id_hemocentro]);
    return "Hemocentro deletado com sucesso";
}

export  async function deletarAgendamento(id_agendamento) {
    const comando = `
    delete from agendamentos
    where id = ?
    `

    await connection.query(comando, [id_agendamento]);    
    return "Agendamento deletado com sucesso";
}

export async function deletarVoluntario(voluntario_id) {
    const comando = `
    delete from cadastro_users
    where id_cadastro = ?
    `

    await connection.query(comando, [voluntario_id]);    
    return "Voluntario deletado com sucesso";
}

