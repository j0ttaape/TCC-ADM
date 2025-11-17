
export default function validarInserirEstoque(infos, estoqueAtual = null){
    if(!infos.tipo_sanguineo)
        throw new Error('Informe o tipo sanguineo');
    if(infos.quantidade === undefined || infos.quantidade === null || typeof infos.quantidade !== 'number' || isNaN(infos.quantidade) )
        throw new Error('Informe uma quantidade válida (número maior ou igual a zero)');
    if(infos.quantidade_maxima === undefined || infos.quantidade_maxima === null || typeof infos.quantidade_maxima !== 'number' || isNaN(infos.quantidade_maxima) || infos.quantidade_maxima < 0)
        throw new Error('Informe uma quantidade máxima válida (número maior ou igual a zero)');
    if(!infos.nome_hemo)
        throw new Error('Informe o nome do hemocentro');

    if(estoqueAtual){
        const novaQuantidade = estoqueAtual.quantidade_bolsas + infos.quantidade;
        const novaMaxima = estoqueAtual.quantidade_maxima + infos.quantidade_maxima;
        if (novaQuantidade > novaMaxima) {
            throw new Error('A quantidade de bolsas não pode exceder a quantidade máxima');
        }
    }
}

export function validarRetirarEstoque(infos){
    if(!infos.tipo_sanguineo)
        throw new Error('Informe o tipo sanguineo');
    if(infos.quantidade === undefined || infos.quantidade === null || typeof infos.quantidade !== 'number' || isNaN(infos.quantidade))
        throw new Error('Informe uma quantidade válida (número maior ou igual a zero)');
    if(!infos.nome_hemo)
        throw new Error('Informe o nome do hemocentro');

}
