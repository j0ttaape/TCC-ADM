
export default function validarInserirEstoque(infos){
    if(!infos.tipo_sanguineo)
        throw new Error('Informe o tipo sanguineo');
    if(!infos.quantidade)
        throw new Error('Informe o tipo sanguineo');
    if(!infos.quantidade_maxima)
        throw new Error('Informe o tipo sanguineo');
    if(!infos.nome_hemo)
        throw new Error('Informe o tipo sanguineo');
  
}