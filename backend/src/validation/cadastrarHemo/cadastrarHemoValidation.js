
import connection from "../../repository/connection.js";

export default async function validarCadastroHemocentro(info){

    if(!info.nome_hemocentro)
        throw new Error('informe o nome do hemocentro');

    if(!info.cidade_hemocentro)
        throw new Error('informe a cidade do hemocentro');

    if(!info.bairro_hemocentro)
        throw new Error('informe o bairro do hemocentro');

    if(!info.rua_hemocentro)
        throw new Error('informe a rua do hemocentro');

    
    const comando = `
    select count(*) as count from hemocentros
    where nome_hemocentro = ?
    `;
    const [result] = await connection.query(comando, [info.nome_hemocentro]);
    if (result[0].count > 0) {
        throw new Error('Erro ao cadastrar hemocentro: Já existe um hemocentro com esse nome');
    }
}

