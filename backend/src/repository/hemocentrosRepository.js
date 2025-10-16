import connection from "./connection.js";


export async function buscarHemocentros(nome){
    const comando = `
    select * from hemocentros
    where nome_hemocentro = ?
    `

    const [registros] = await connection.query(comando,[nome]);
    return registros; 
}