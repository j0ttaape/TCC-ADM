
export default function validarCadastroHemocentro(info){

    if(!info.nome_hemocentro)
        throw new Error('informe o nome do hemocentro');
    
    if(!info.cidade_hemocentro)
        throw new Error('informe a cidade do hemocentro');
    
    if(!info.bairro_hemocentro)
        throw new Error('informe o bairro do hemocentro');
    
    if(!info.rua_hemocentro)
        throw new Error('informe a rua do hemocentro');
}

