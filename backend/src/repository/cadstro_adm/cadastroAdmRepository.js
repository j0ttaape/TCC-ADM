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