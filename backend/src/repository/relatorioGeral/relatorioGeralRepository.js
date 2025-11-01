import connection from "../connection.js";

export async function relatorioGeralCadastros() {
    const comando = `
    select * from cadastro_users
    `
    const [registros] = await connection.query(comando);

    return registros;
}

export async function relatorioGeralAgendamentos() {
    const comando = `
    select * from agendamentos
    `

    const [registros] = await connection.query(comando);

    return registros;
}

export async function relatorioGeralHemocentros() {
    const comando = `
    select * from hemocentros
    `

    const [registros] = await connection.query(comando);

    return registros;
}  
