import connection from "../connection.js";


export default async function cadastrarHemocentro(informacoes){
    const comando = `
    insert into hemocentros(nome_hemocentro, cidade_hemocentro, bairro_hemocentro, rua_hemocentro)
    values
    (?,?,?,?)
    `

    const [info] = await connection.query(comando,[informacoes.nome_hemocentro,informacoes.cidade_hemocentro,informacoes.bairro_hemocentro,informacoes.rua_hemocentro])
    return info.insertId
}
