import connection from "../connection.js";

export async function doaçõesSemana(id_usuario){
    const comando = `select permissao from cadastro_adm
    where id_adm = ?`

    const perm = await connection.query(comando,[id_usuario]);
    const permissao = perm[0].permissao;

    if(permissao ){
    
    const quantidade = await connection.query(`select * from doaçõesSemana`);

    return quantidade;}

    else 
    {
        return `Você não está autorizado a esta ação`
    }
}