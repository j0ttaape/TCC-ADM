import connection from "../connection.js";


export async function buscarHemocentros(nome){
    const comando = `
    select * from hemocentros
    where nome_hemocentro like ?
    `

    const [registros] = await connection.query(comando,[`%${nome}%`]);
    return registros;
}

export async function listarHemocentros(){
    const comando = `
    select * from hemocentros
    order by nome_hemocentro asc
    `

    const [registros] = await connection.query(comando);

    return registros;
}
