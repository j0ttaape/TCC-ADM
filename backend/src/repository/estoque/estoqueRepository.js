import connection from "../connection.js";

export async function adicionarNoEstoque(infos, id_adm){
    const comando = `
    select * from cadastro_adm 
    where id_adm = ?
    `

    const [registros] = await connection.query(comando,[id_adm]);
    const perm = registros[0].permissao;


    if(perm){
        const comando2 = `
        select id_hemocentro from hemocentros
        where nome_hemocentro = ? 
        `
        const [id] = await connection.query(comando2,[infos.nome_hemo]); 

        if(id.length == 1){
        const comando3 = `
        insert into estoque (tipo_sanguineo,quantidade_bolsas,quantidade_maxima,id_hemocentro)
        values
        (?,?,?,?)
        `
          await connection.query(comando3,[infos.tipo_sanguineo,infos.quantidade,infos.quantidade_maxima,id[0].id_hemocentro]);
         return 'salvo no banco de dados'
         
    }

    else{
        return 'Hemocentro não encontrado'
}
         
    }
    else{
        return 'Você não tem permissão para essa ação'

    }

}