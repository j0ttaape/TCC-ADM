import connection from "../connection.js";

export async function editarHemocentro(informacoes, id_hemocentro) {
    const comando = `
    update hemocentros
    set nome_hemocentro = ?, cidade_hemocentro = ?, bairro_hemocentro = ?, rua_hemocentro = ?
    where id_hemocentro = ?
    `

    await connection.query(comando, [informacoes.nome_hemocentro, informacoes.cidade_hemocentro, informacoes.bairro_hemocentro, informacoes.rua_hemocentro, id_hemocentro]);    
    return "Hemocentro editado com sucesso";
}

export default editarHemocentro;