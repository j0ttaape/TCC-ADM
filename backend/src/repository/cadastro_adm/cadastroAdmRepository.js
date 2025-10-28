import connection from "../connection.js";

export async function permissaoAdm(informacoes){
const comando = `
insert into cadastro_adm(nome,email, senha, permissao)
values
(?,?,MD5(?),false)
`
const [info] = await connection.query(comando,[informacoes.nome,informacoes.email,informacoes.senha]);

const comando2 = `
select * from cadastro_adm
`

const [registros] = await connection.query(comando2);

if(registros.length == 1){
    const comando3 = `
    update cadastro_adm
    set permissao = true
    where id_adm = ?
    `

     await connection.query(comando3,[info.insertId]);
     let mensagem = 'Administrador permitido'
    return mensagem
}
else{
    let mensagem = 'Aguardar permissão'
return mensagem
}

}



export async function listarPedidos(){
    const comando = `
    select * from cadastro_adm
    where permissao = false
    `

    const [registros] = await connection.query(comando);

    return registros;
}

export async function concederPermissao(id_requerido,nome){
    const comando = `
    select permissao from cadastro_adm
    where nome = ?
    `
    const [adm] = await connection.query(comando,[nome]);

    if (adm.length === 0) {
        return 'Administrador não encontrado';
    }

    const perm = adm[0].permissao;

    if(perm){
        const comando2 = `
        update cadastro_adm
        set permissao = true
        where id_adm = ?
        `
        await connection.query(comando2,[id_requerido]);

        let resposta = 'Usuário Permitido'
        return resposta
    }
    else {
        let resposta = 'Você não tem permissão para essa ação'
        return resposta;
    }


}
