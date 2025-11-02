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
 select h.nome_hemocentro as hemocentro, count(a.id) as totalAgendamentos
    from agendamentos a
    inner join hemocentros h on a.hemocentro_id = h.id_hemocentro
    group by h.id_hemocentro, h.nome_hemocentro;
    `

    const [registros] = await connection.query(comando);

    return registros;
}

export async function relatorioGeralBolsas(){
    const comando = `
    select * from geralQuantidadeLitros
    `
    const [registros] = await connection.query(comando);
    
    return registros;
    
}