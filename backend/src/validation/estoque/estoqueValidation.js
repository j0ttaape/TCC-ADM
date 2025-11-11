
export default function validarInserirEstoque(infos){
    if(!infos.tipo_sanguineo)
        throw new Error('Informe o tipo sanguineo');
    if(infos.quantidade === undefined || infos.quantidade === null || typeof infos.quantidade !== 'number' || isNaN(infos.quantidade) || infos.quantidade > infos.quantidade_maxima)
        throw new Error('Quantidade não pode ser maior que a quantidade máxima');
    if(infos.quantidade_maxima === undefined || infos.quantidade_maxima === null || typeof infos.quantidade_maxima !== 'number' || isNaN(infos.quantidade_maxima) || infos.quantidade_maxima < 0)
        throw new Error('Informe uma quantidade máxima válida (número maior ou igual a zero)');
    if(!infos.nome_hemo)
        throw new Error('Informe o nome do hemocentro');

}

export function validarRetirarEstoque(infos){
    if(!infos.tipo_sanguineo)
        throw new Error('Informe o tipo sanguineo');
    if(infos.quantidade === undefined || infos.quantidade === null || typeof infos.quantidade !== 'number' || isNaN(infos.quantidade) || infos.quantidade_maxima < infos.quantidade)
        throw new Error('Quantidade máxima não pode ser menor que a quantidade do estoque');
    if(!infos.nome_hemo)
        throw new Error('Informe o nome do hemocentro');

}
