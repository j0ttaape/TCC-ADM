import connection from "../connection.js";


export default async function cadastrarHemocentro(informacoes){
    const comando = `
    insert into hemocentros(nome_hemocentro, cidade_hemocentro, bairro_hemocentro, rua_hemocentro)
    values
    (?,?,?,?)
    `

    const [info] = await connection.query(comando,[informacoes.nome_hemocentro,informacoes.cidade_hemocentro,informacoes.bairro_hemocentro,informacoes.rua_hemocentro])

    const comando2 = `
    INSERT INTO estoque (tipo_sanguineo, quantidade_bolsas, quantidade_maxima, id_hemocentro)
    VALUES
    ('A+', 0, 0, ?),
    ('A-', 0, 0, ?),
    ('B+', 0, 0, ?),
    ('B-', 0, 0, ?),
    ('AB+', 0, 0, ?),
    ('AB-', 0, 0, ?),
    ('O+', 0, 0, ?),
    ('O-', 0, 0, ?);

    `
    await connection.query(comando2,[info.insertId,info.insertId,info.insertId,info.insertId,info.insertId,info.insertId,info.insertId,info.insertId])
    return info.insertId
}
