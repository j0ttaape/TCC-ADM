
export default function validarInserirEstoque(infos){
    if(!infos.tipo_sanguineo)
        throw new Error('Informe o tipo sanguineo');
    if(infos.quantidade === undefined || infos.quantidade === null || infos.quantidade < 0)
        throw new Error('Informe uma quantidade válida (maior ou igual a zero)');
    if(infos.quantidade_maxima === undefined || infos.quantidade_maxima === null || infos.quantidade_maxima < 0)
        throw new Error('Informe uma quantidade máxima válida (maior ou igual a zero)');
    if(!infos.nome_hemo)
        throw new Error('Informe o nome do hemocentro');

}

export function validarRetirarEstoque(infos){
    if(!infos.tipo_sanguineo)
        throw new Error('Informe o tipo sanguineo');
    if(infos.quantidade === undefined || infos.quantidade === null || infos.quantidade < 0)
        throw new Error('Informe uma quantidade válida para retirada (maior ou igual a zero)');
    if(!infos.nome_hemo)
        throw new Error('Informe o nome do hemocentro');

}
