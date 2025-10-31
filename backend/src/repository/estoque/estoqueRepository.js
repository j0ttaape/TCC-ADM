import connection from "../connection.js";

export async function adicionarNoEstoque(infos, id_adm){
    const comando2 = `
    select id_hemocentro from hemocentros
    where nome_hemocentro = ?
    `
    const [id] = await connection.query(comando2,[infos.nome_hemo]);

    if(id.length == 1){
        // Verificar se a adição não excede a quantidade máxima
        const comandoVerificar = `
        select quantidade_bolsas, quantidade_maxima from estoque
        where id_hemocentro = ?
        and tipo_sanguineo = ?
        `
        const [estoqueAtual] = await connection.query(comandoVerificar, [id[0].id_hemocentro, infos.tipo_sanguineo]);

        if (estoqueAtual.length > 0) {
            const novaQuantidade = estoqueAtual[0].quantidade_bolsas + infos.quantidade;
            const novaMaxima = estoqueAtual[0].quantidade_maxima + infos.quantidade_maxima;

            if (novaQuantidade > novaMaxima) {
                throw new Error('A quantidade de bolsas não pode exceder a quantidade máxima');
            }
        }

        const comando3 = `
        update estoque
        set quantidade_bolsas = quantidade_bolsas + ?,
        quantidade_maxima = quantidade_maxima + ?
        where id_hemocentro = ?
        and tipo_sanguineo = ?
        `
        await connection.query(comando3,[infos.quantidade,infos.quantidade_maxima,id[0].id_hemocentro,infos.tipo_sanguineo]);
        return 'salvo no banco de dados'

}

else{
    return 'Hemocentro não encontrado'
}

}

export async function retirarDoEstoque(infos, id_adm){
    const comando2 = `
    select id_hemocentro from hemocentros
    where nome_hemocentro = ?
    `
    const [id] = await connection.query(comando2,[infos.nome_hemo]);

    if(id.length == 1){
        // Verificar se há quantidade suficiente para retirada
        const comandoVerificar = `
        select quantidade_bolsas, quantidade_maxima from estoque
        where id_hemocentro = ?
        and tipo_sanguineo = ?
        `
        const [estoqueAtual] = await connection.query(comandoVerificar, [id[0].id_hemocentro, infos.tipo_sanguineo]);

        if (estoqueAtual.length > 0) {
            const novaQuantidade = estoqueAtual[0].quantidade_bolsas - infos.quantidade;
            const novaMaxima = estoqueAtual[0].quantidade_maxima - infos.quantidade_maxima;

            if (novaQuantidade < 0 || novaMaxima < 0) {
                return 'A quantidade a retirar não pode deixar o estoque negativo';
            }
        } else {
            return 'Estoque não encontrado para este tipo sanguíneo';
        }

        const comando3 = `
        update estoque
        set quantidade_bolsas = quantidade_bolsas - ?,
        quantidade_maxima = quantidade_maxima - ?
        where id_hemocentro = ?
        and tipo_sanguineo = ?
        `
        await connection.query(comando3,[infos.quantidade,infos.quantidade_maxima,id[0].id_hemocentro,infos.tipo_sanguineo]);
        return 'retirado do banco de dados'

}

else{
    return 'Hemocentro não encontrado'
}

}

export async function listarEstoqueHemocentro(nome_hemo){
    const comando = `
    select id_hemocentro from hemocentros
    where nome_hemocentro = ?
    `
    const [id] = await connection.query(comando,[nome_hemo]);

    if(id.length == 1){
        const comando2 = `
        select tipo_sanguineo, quantidade_bolsas, quantidade_maxima
        from estoque
        where id_hemocentro = ?
        order by tipo_sanguineo
        `
        const [estoque] = await connection.query(comando2,[id[0].id_hemocentro]);
        return estoque;
    }
    else{
        throw new Error('Hemocentro não encontrado');
    }
}
