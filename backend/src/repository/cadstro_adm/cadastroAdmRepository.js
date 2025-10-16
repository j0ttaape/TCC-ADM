import connection from "../connection.js";

export async function permissaoAdm(informacoes){
const comando = `
insert into cadastro_adm(nome,email, senha, permissao)
values
(?,?,MD5(?),false)
`

const [info] = await connection.query(comando,[informacoes.nome,informacoes.email,informacoes.senha]);
return info.insertId

}

export async function permissoesAdm(informacoes){
    const comando = `
    select id_adm from cadastro_adm
    where email = ? 
    and nome = ?   
    `

    const [registros] = await connection.query(comando,[informacoes.email,informacoes.nome]);
    return registros;
}
