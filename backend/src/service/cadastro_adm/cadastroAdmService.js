import { concederPermissao, listarPedidos, permissaoAdm,  } from "../../repository/cadastro_adm/cadastroAdmRepository.js"
import validarCadastroAdm, { validarConcederPermissao } from "../../validation/cadastro_adm/cadastroAdmValidation.js";

export async function permissaoAdmService(informacoes){
try {


    validarCadastroAdm(informacoes);
    const mensagem = await permissaoAdm(informacoes);

    return mensagem;
}
catch (error) {
throw error
}

}

export async function listarPedidosService(){
try {
const registros = await listarPedidos();

return registros;
    
} 
catch (error) {
    throw error;
}

}

export async function concederPermissaoService(id_requerido,nome){
    try {
    validarConcederPermissao(id_requerido);

    const resposta = await concederPermissao(id_requerido,nome);

    return resposta;

    }
    catch (error) {
        throw error
    }
}
